import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';

const MILLISECONDS_IN_SECOND = 1000;
const DISTANCE_EPS = 0.2;
const PROBABLE_FRAMERATE = 60;
const ADDITIONAL_TRANSLATE_OFFSET = 1;
const ADDITIONAL_ROTATE_OFFSET = 1;
const THROTTLE_DELAY = MILLISECONDS_IN_SECOND / 50;
const MIN_SPEED_TO_START_SPINNING = 2;
// const MIN_END_SPINNING_SPEED = 2;
const ROTATE_X_DEG_REP_SCREEN = 250;
const ROTATE_Y_DEG_REP_SCREEN = 40;
const MIN_ROTATE_Y = -10;
const MAX_ROTATE_Y = 10;
const GRAVITY_COEF_X = 1 / 300;
const GRAVITY_COEF_Y = 1 / 60;
const SPEED_DROP_COEF = 0.8;
const SPINNING_SPEED_DROP_COEF = 0.992;
const MIN_DRAG_DELTA_TO_START_FULL_SPIN = 80;
const MIN_POSSIBLE_SPEED = 0.01;
const MAX_POSSIBLE_SPEED = 10;
const MIN_POSSIBLE_SPINNING_SPEED = 1.5;

enum ContainerMode {
  standing = 'standing',
  grabbing = 'grabbing',
  spinning = 'spinning',
  stopping = 'stopping',
}

enum ContainerSide {
  front = 'front',
  back = 'back',
}

interface Transform {
  translateX: number;
  translateY: number;
  rotateX: number;
  rotateY: number;
}

const defaultTransform = { translateX: 0, translateY: 0, rotateX: 0, rotateY: 0 };

interface BackSideProps {
  isDisplayed: boolean;
}

interface HighTechContainerProps {
  backSide: React.ComponentType<BackSideProps>;
}

interface HighTechContainerState {
  mode: ContainerMode;
  visibleSide: ContainerSide;
}

export default class HighTechContainer extends React.PureComponent<HighTechContainerProps, HighTechContainerState> {
  private front = React.createRef<HTMLDivElement>();
  private back = React.createRef<HTMLDivElement>();
  private readonly throttledOnMouseMove: (event: MouseEvent) => void;

  private previousFrameTimeMark: number = new Date().getTime();
  private previousMouseMoveTimeMark: number = new Date().getTime();
  private frameRate: number = PROBABLE_FRAMERATE; // 1/s
  private dragDelta: number = 0; // deg
  private mouseDownPosition: { x: number, y: number } = { x: 0, y: 0 };
  private mousePosition: { x: number, y: number } = { x: window.innerWidth / 2, y: window.innerHeight };
  private mouseSpeed: { x: number, y: number } = { x: 0, y: 0 }; // px/ms
  private transform: Transform = { ...defaultTransform };
  private additionalTransform: Transform = { ...defaultTransform };
  private stopTransform: Transform = { ...defaultTransform };

  constructor(props: HighTechContainerProps) {
    super(props);

    this.state = {
      mode: ContainerMode.standing,
      visibleSide: ContainerSide.front,
    };

    this.throttledOnMouseMove = _.throttle(this.handleMouseMove, THROTTLE_DELAY);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleMouseDown, true);
    document.addEventListener('mouseup', this.handleMouseUp, true);
    document.addEventListener('mousemove', this.throttledOnMouseMove, true);

    requestAnimationFrame(this.handleFrame);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleMouseDown, true);
    document.removeEventListener('mouseup', this.handleMouseUp, true);
    document.removeEventListener('mousemove', this.throttledOnMouseMove, true);
  }

  public render(): React.ReactNode {
    const BackSide = this.props.backSide;
    const isBackSideDisplayed = this.state.visibleSide === ContainerSide.back &&
      (this.state.mode === ContainerMode.stopping || this.state.mode === ContainerMode.standing);

    const containerClasses = classNames('high-tech-container', `high-tech-container_${_.kebabCase(this.state.mode)}`);

    const frontClasses = classNames('high-tech-container__front', {
      'high-tech-container__front_hidden': this.state.visibleSide === ContainerSide.back,
    });

    const backClasses = classNames('high-tech-container__back', {
      'high-tech-container__back_hidden': this.state.visibleSide === ContainerSide.front,
    });

    return (
      <div className={containerClasses}>
        <div className={frontClasses} ref={this.front}>
          {this.props.children}
        </div>
        <div className={backClasses} ref={this.back}>
          <BackSide isDisplayed={isBackSideDisplayed}/>
        </div>
      </div>
    );
  }

  public handleFrame = (): void => {
    this.updateFrameRate();

    if (this.state.mode === ContainerMode.grabbing) {
      this.transformGrabbed();
    }

    if (this.state.mode === ContainerMode.spinning) {
      this.transformSpinning();
    }

    if (this.state.mode === ContainerMode.stopping) {
      this.transformStopping();
    }

    if (this.state.mode !== ContainerMode.standing) {
      this.updateVisibleSide();
      this.hitTheBrakes();
    }

    this.transformAdditional();
    this.applyTransform();

    requestAnimationFrame(this.handleFrame);
  }

  /****** actions ******/
  private stand(): void {
    this.setState({ mode: ContainerMode.standing });
    this.transform = { ...this.stopTransform };
  }

  private spin(): void {
    this.setState({ mode: ContainerMode.spinning });
  }

  private grab(): void {
    this.setState({ mode: ContainerMode.grabbing });
  }

  private stop(stopTransform: Transform): void {
    this.setState({ mode: ContainerMode.stopping });
    this.stopTransform = stopTransform;
  }

  private hitTheBrakes(): void {
    const isMoving = this.getTotalSpeed() > MIN_POSSIBLE_SPEED;
    if (!isMoving) {
      this.mouseSpeed = { x: 0, y: 0 };
      return;
    }

    const frameRateDrop = PROBABLE_FRAMERATE / this.frameRate;

    if (this.state.mode === ContainerMode.spinning) {
      const multiplierX = this.mouseSpeed.x > 0 ? 1 : -1;

      const newSpeedX = Math.abs(this.mouseSpeed.x) > MIN_POSSIBLE_SPINNING_SPEED ?
        this.mouseSpeed.x * Math.pow(SPINNING_SPEED_DROP_COEF, frameRateDrop) :
        multiplierX * MIN_POSSIBLE_SPINNING_SPEED;

      const forcedToZeroSpeed = this.mouseSpeed.y + this.transform.rotateX * GRAVITY_COEF_Y * frameRateDrop;
      const newSpeedY = forcedToZeroSpeed * Math.pow(SPEED_DROP_COEF, frameRateDrop);

      this.mouseSpeed = { x: newSpeedX, y: newSpeedY };
      return;
    }

    this.mouseSpeed = {
      x: this.mouseSpeed.x * Math.pow(SPEED_DROP_COEF, frameRateDrop),
      y: this.mouseSpeed.y * Math.pow(SPEED_DROP_COEF, frameRateDrop),
    };
  }

  /****** translators ******/
  private transformAdditional(): void {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const xCoef = (this.mousePosition.x * 2 - innerWidth) / innerWidth;
    const yCoef = (this.mousePosition.y * 2 - innerHeight) / innerHeight;

    const translateX = ADDITIONAL_TRANSLATE_OFFSET * xCoef;
    const translateY = ADDITIONAL_TRANSLATE_OFFSET * yCoef;
    const rotateX = ADDITIONAL_ROTATE_OFFSET * yCoef;
    const rotateY = ADDITIONAL_ROTATE_OFFSET * -xCoef;

    this.additionalTransform = { translateX, translateY, rotateX, rotateY };
  }

  private transformGrabbed(): void {
    const { rotateX, rotateY } = this.transform;
    const timePassed = MILLISECONDS_IN_SECOND / this.frameRate;

    const delta = { x: timePassed * this.mouseSpeed.x, y: timePassed * this.mouseSpeed.y };
    const rotateStep = { x: ROTATE_X_DEG_REP_SCREEN / window.innerWidth, y: ROTATE_Y_DEG_REP_SCREEN / window.innerHeight };

    this.transform = {
      ...this.transform,
      rotateX: this.truncateToBounds(rotateX - delta.y * rotateStep.y, MIN_ROTATE_Y, MAX_ROTATE_Y),
      rotateY: rotateY + delta.x * rotateStep.x,
    };
  }

  private transformSpinning(): void {
    const rotateDirection = this.transform.rotateY > 0 ? 1 : -1;
    const speedDirection = this.mouseSpeed.x > 0 ? 1 : -1;

    const rotateAngleRelativeToFront = Math.abs(this.transform.rotateY) % 360;
    // const isRotatedBeforeFrontSide = rotateDirection === speedDirection ?
    //   (270 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 360) :
    //   (0 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 90);

    const isRotatedBeforeAnySide = rotateDirection === speedDirection ?
      (90 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 180) || (270 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 360) :
      (0 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 90) || (180 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 270);

    const isFullSpin = Math.abs(this.dragDelta) >= MIN_DRAG_DELTA_TO_START_FULL_SPIN;

    // if (Math.abs(this.mouseSpeed.x) < MIN_END_SPINNING_SPEED && isFullSpin && isRotatedBeforeFrontSide) {
    //   this.stop(this.getNextClosestFrontSideStopTransform());
    //   return;
    // }

    if (!isFullSpin && isRotatedBeforeAnySide) {
      this.stop(this.getNextClosestSideStopTransform());
      return;
    }

    this.transformGrabbed();
  }

  private transformStopping(): void {
    const distance = { x: this.stopTransform.rotateX - this.transform.rotateX, y: this.stopTransform.rotateY - this.transform.rotateY };
    const fullDistance = Math.sqrt(distance.x * distance.x + distance.y * distance.y);

    if (fullDistance <= DISTANCE_EPS && this.getTotalSpeed() <= MIN_POSSIBLE_SPEED) {
      this.stand();
      return;
    }

    const frameRateDrop = PROBABLE_FRAMERATE / this.frameRate;
    const gravityY = -(distance.x) * GRAVITY_COEF_Y;
    const gravityX = (distance.y) * GRAVITY_COEF_X;

    this.mouseSpeed = {
      x: this.mouseSpeed.x + gravityX * frameRateDrop,
      y: this.mouseSpeed.y + gravityY * frameRateDrop,
    };

    this.transformGrabbed();
  }

  /****** event handlers ******/
  private handleMouseMove = (event: MouseEvent): void => {
    if (this.state.mode === ContainerMode.grabbing) {
      this.updateMouseSpeed(event);
    }

    this.updateMousePosition(event);
  }

  private handleMouseDown = (event: MouseEvent): void => {
    const isClickedOnFront = this.front.current && this.front.current.contains(event.target as Element);
    const isClickedOnBack = this.back.current && this.back.current.contains(event.target as Element);

    if (!isClickedOnFront && !isClickedOnBack) {
      this.mouseDownPosition = { ...this.mousePosition };
      this.grab();
    }
  }

  private handleMouseUp = (_event: MouseEvent): void => {
    if (this.state.mode !== ContainerMode.grabbing) {
      return;
    }

    this.dragDelta = -(this.mouseDownPosition.x - this.mousePosition.x) / window.innerWidth * ROTATE_X_DEG_REP_SCREEN;

    if (Math.abs(this.mouseSpeed.x) > MIN_SPEED_TO_START_SPINNING) {
      this.spin();
    } else {
      this.stop(this.getClosestSideStopTransform());
    }
  }

  /****** helpers ******/
  // private getNextClosestFrontSideStopTransform(): Transform {
  //   const rotateY = this.transform.rotateY;
  //   const absRotateY = Math.abs(rotateY);
  //   const rotateDirection = rotateY > 0 ? 1 : -1;
  //   const speedDirection = this.mouseSpeed.x > 0 ? 1 : -1;
  //   const round = rotateDirection === speedDirection ? Math.ceil : Math.floor;
  //   const closest = rotateDirection * round(absRotateY / 360) * 360;
  //
  //   return {
  //     ...this.transform,
  //     rotateX: 0,
  //     rotateY: closest,
  //   };
  // }

  private getNextClosestSideStopTransform(): Transform {
    const rotateY = this.transform.rotateY;
    const absRotateY = Math.abs(rotateY);
    const rotateDirection = rotateY > 0 ? 1 : -1;
    const speedDirection = this.mouseSpeed.x > 0 ? 1 : -1;
    const round = rotateDirection === speedDirection ? Math.ceil : Math.floor;
    const closest = rotateDirection * round(absRotateY / 180) * 180;

    return {
      ...this.transform,
      rotateX: 0,
      rotateY: closest,
    };
  }

  private getClosestSideStopTransform(): Transform {
    const multiplier = this.transform.rotateY > 0 ? 1 : -1;
    const abs = Math.abs(this.transform.rotateY);
    const leftovers = abs % 180;
    const absClosest = leftovers < 90 ? abs - leftovers : abs - leftovers + 180;

    return {
      ...this.transform,
      rotateX: 0,
      rotateY: multiplier * absClosest,
    };
  }

  private applyTransform(): void {
    if (this.front.current) {
      this.front.current.style.transform = this.getFrontTransformString();
    }

    if (this.back.current) {
      this.back.current.style.transform = this.getBackTransformString();
    }
  }

  private getFrontTransformString(): string {
    return `translateX(${this.transform.translateX + this.additionalTransform.translateX}px)
      translateY(${this.transform.translateY + this.additionalTransform.translateY}px)
      rotateX(${this.transform.rotateX + this.additionalTransform.rotateX}deg)
      rotateY(${this.transform.rotateY + this.additionalTransform.rotateY}deg)`;
  }

  private getBackTransformString(): string {
    return `translateX(${this.transform.translateX + this.additionalTransform.translateX}px)
      translateY(${this.transform.translateY + this.additionalTransform.translateY}px)
      rotateX(${this.transform.rotateX + this.additionalTransform.rotateX }deg)
      rotateY(${this.transform.rotateY + this.additionalTransform.rotateY + 180}deg)`;
  }

  private getTotalSpeed(): number {
    return Math.sqrt(this.mouseSpeed.x * this.mouseSpeed.x + this.mouseSpeed.y * this.mouseSpeed.y);
  }

  private truncateToBounds(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
  }

  /****** updaters ******/
  private updateMousePosition(event: MouseEvent): void {
    this.mousePosition = { x: event.pageX, y: event.pageY };
  }

  private updateMouseSpeed(event: MouseEvent): void {
    const newTimeMark = new Date().getTime();
    const timePassed = newTimeMark - this.previousMouseMoveTimeMark;

    this.mouseSpeed = {
      x: this.truncateToBounds((event.pageX - this.mousePosition.x) / timePassed, -MAX_POSSIBLE_SPEED, MAX_POSSIBLE_SPEED),
      y: this.truncateToBounds((event.pageY - this.mousePosition.y) / timePassed, -MAX_POSSIBLE_SPEED, MAX_POSSIBLE_SPEED),
    };

    this.previousMouseMoveTimeMark = newTimeMark;
  }

  private updateVisibleSide(): void {
    const rotateAngleRelativeToFront = Math.abs(this.transform.rotateY) % 360;
    const isFrontSideVisible = (270 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 360) ||
      (0 <= rotateAngleRelativeToFront && rotateAngleRelativeToFront <= 90);

    if (this.state.visibleSide === ContainerSide.front && !isFrontSideVisible) {
      this.setState({ visibleSide: ContainerSide.back });
    } else if (this.state.visibleSide === ContainerSide.back && isFrontSideVisible) {
      this.setState({ visibleSide: ContainerSide.front });
    }
  }

  private updateFrameRate(): void {
    const newTimeMark = new Date().getTime();
    const newFrameRate = MILLISECONDS_IN_SECOND / (newTimeMark - this.previousFrameTimeMark);

    if (newFrameRate > 1) { // if frameRate < 1 then probably page was hidden for some time
      this.frameRate = newFrameRate;
    }

    this.previousFrameTimeMark = newTimeMark;
  }
}

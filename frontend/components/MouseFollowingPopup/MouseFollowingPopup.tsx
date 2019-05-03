import * as React from 'react';
import classNames from 'classnames';

const MOUSE_POSITION_OFFSET = 10;
const WINDOW_OFFSET = 20;

interface PopupState {
  content: React.ReactNode | null;
  isTop: boolean;
  isLeft: boolean;
}

export default class MouseFollowingPopup extends React.PureComponent<{}, PopupState> {
  public static render(content: React.ReactNode): void {
    if (!this.singletonInstance) {
      throw new Error('No instance created.');
    }

    this.singletonInstance.setState({ content });
  }

  public static hide(): void {
    if (!this.singletonInstance) {
      throw new Error('No instance created.');
    }

    this.singletonInstance.setState({ content: null });
  }

  public static isDisplayed(): boolean {
    return !!this.singletonInstance && !!this.singletonInstance.state.content;
  }

  private static singletonInstance: MouseFollowingPopup | null = null;
  private popup = React.createRef<HTMLDivElement>();
  private mousePosition: { x: number, y: number } = { x: 0, y: 0 };

  constructor(props: {}) {
    super(props);

    this.state = {
      content: null,
      isTop: false,
      isLeft: false,
    };

    MouseFollowingPopup.singletonInstance = this;
  }

  public componentDidMount(): void {
    document.addEventListener('mousemove', this.onMouseMove, true);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousemove', this.onMouseMove, true);
  }

  public render(): React.ReactNode {
    const popupClasses = classNames('mouse-following-popup', {
      'mouse-following-popup_has-content': !!this.state.content,
      'mouse-following-popup_top': this.state.isTop,
      'mouse-following-popup_left': this.state.isLeft,
    });

    return (
      <div className={popupClasses} ref={this.popup}>
        {this.state.content}
      </div>
    );
  }

  private getContentHeight(): number {
    return MouseFollowingPopup.isDisplayed() ? this.popup.current!.offsetHeight : 0;
  }

  private getContentWidth(): number {
    return MouseFollowingPopup.isDisplayed() ? this.popup.current!.offsetWidth : 0;
  }

  private isNotEnoughSpaceBellow(): boolean {
    return window.innerHeight - this.mousePosition.y - MOUSE_POSITION_OFFSET - this.getContentHeight() < WINDOW_OFFSET;
  }

  private isNotEnoughSpaceRight(): boolean {
    return window.innerWidth - this.mousePosition.x - MOUSE_POSITION_OFFSET - this.getContentWidth() < WINDOW_OFFSET;
  }

  private updatePosition(): void {
    const isLeft = this.isNotEnoughSpaceRight();
    const isTop = this.isNotEnoughSpaceBellow();

    const offsetX = isLeft ? -MOUSE_POSITION_OFFSET : MOUSE_POSITION_OFFSET;
    const offsetY = isTop ? -MOUSE_POSITION_OFFSET : MOUSE_POSITION_OFFSET;

    this.popup.current!.style.left = `${this.mousePosition.x + offsetX}px`; // setting css directly for better performance comparing to rerender
    this.popup.current!.style.top = `${this.mousePosition.y + offsetY}px`;

    this.setState({ isLeft, isTop });
  }

  private onMouseMove = (event: MouseEvent): void => {
    this.mousePosition = { x: event.pageX, y: event.pageY };

    if (MouseFollowingPopup.isDisplayed()) {
      this.updatePosition();
    }
  }
}

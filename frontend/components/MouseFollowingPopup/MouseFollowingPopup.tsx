import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';

const MOUSE_POSITION_OFFSET = 10;
const WINDOW_OFFSET = 20;

interface PopupState {
  content: React.ReactNode | null;
  contentHeight: number;
  contentWidth: number;
  mousePosition: { x: number, y: number };
}

export default class MouseFollowingPopup extends React.Component<{}, PopupState> {
  public static render(content: React.ReactNode): void {
    if (!this.singletonInstance) {
      throw new Error('No instance created.');
    }

    this.singletonInstance.setState({ content }, () => this.singletonInstance!.updateContentSize());
  }

  public static hide(): void {
    if (!this.singletonInstance) {
      throw new Error('No instance created.');
    }

    this.singletonInstance.setState({ content: null }, () => this.singletonInstance!.updateContentSize());
  }

  private static singletonInstance: MouseFollowingPopup | null = null;
  private readonly throttledSaveMousePosition = _.throttle(this.saveMousePosition.bind(this), 10);
  private popupRef = React.createRef<HTMLDivElement>();

  constructor(props: {}) {
    super(props);

    if (MouseFollowingPopup.singletonInstance) {
      throw new Error('Popup should be singleton.');
    }

    this.state = {
      content: null,
      contentHeight: 0,
      contentWidth: 0,
      mousePosition: { x: 0, y: 0 },
    };

    MouseFollowingPopup.singletonInstance = this;
  }

  public componentDidMount(): void {
    document.addEventListener('mousemove', this.throttledSaveMousePosition);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousemove', this.throttledSaveMousePosition);
  }

  public isNotEnoughSpaceBellow(): boolean {
    const { mousePosition, contentHeight } = this.state;

    return window.innerHeight - mousePosition.y - MOUSE_POSITION_OFFSET - contentHeight < WINDOW_OFFSET;
  }

  public isNotEnoughSpaceRight(): boolean {
    const { mousePosition, contentWidth } = this.state;

    return window.innerWidth - mousePosition.x - MOUSE_POSITION_OFFSET - contentWidth < WINDOW_OFFSET;
  }

  public render(): React.ReactNode {
    if (!this.state.content) {
      return null;
    }

    const popupClasses = classNames('mouse-following-popup', {
      'mouse-following-popup_top': this.isNotEnoughSpaceBellow(),
      'mouse-following-popup_left': this.isNotEnoughSpaceRight(),
    });

    return (
      <div className={popupClasses} style={this.getInlineStyle()} ref={this.popupRef}>
        {this.state.content}
      </div>
    );
  }

  public updateContentSize(): void {
    if (!this.popupRef.current) {
      this.setState({
        contentHeight: 0,
        contentWidth: 0,
      });

      return;
    }

    this.setState({
      contentHeight: this.popupRef.current.offsetHeight,
      contentWidth: this.popupRef.current.offsetWidth,
    });
  }

  private getInlineStyle(): React.CSSProperties {
    const offsetX = this.isNotEnoughSpaceRight() ? -MOUSE_POSITION_OFFSET : MOUSE_POSITION_OFFSET;
    const offsetY = this.isNotEnoughSpaceBellow() ? -MOUSE_POSITION_OFFSET : MOUSE_POSITION_OFFSET;

    return {
      left: this.state.mousePosition.x + offsetX,
      top: this.state.mousePosition.y + offsetY,
    };
  }

  private saveMousePosition(event: MouseEvent): void {
    this.setState({
      mousePosition: { x: event.pageX, y: event.pageY },
    });
  }
}

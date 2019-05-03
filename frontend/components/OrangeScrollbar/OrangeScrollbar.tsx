import * as React from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';

const thumbStyle = {
  backgroundColor: '#ff5f22',
  borderRadius: '5rem',
  width: '0.28rem',
  boxShadow: ' 0 0.7rem 1.4rem rgba(0,0,0,0.25), 0 0.5em 0.5em rgba(0,0,0,0.22)',
};

const trackStyle = {
  height: '100%',
  top: 0,
  right: '0.13rem',
  paddingTop: 3,
  paddingBottom: 3,
};

export default class OrangeScrollbar extends React.Component<ScrollbarProps, {}> {
  public renderThumbVecrital = ({ style, ...props }: { style: React.CSSProperties }) => {
    return (
      <div style={{ ...style, ...thumbStyle }} {...props}/>
    );
  }

  public renderTrackVertical = ({ style, ...props }: { style: React.CSSProperties }) => {
    return (
      <div style={{ ...style, ...trackStyle }} {...props}/>
    );
  }

  public render(): React.ReactNode {
    return (
      <Scrollbars
        renderThumbVertical={this.renderThumbVecrital}
        renderTrackVertical={this.renderTrackVertical}
        {...this.props}
      />
    );
  }
}

import * as React from 'react';

export default class SimpleLoader extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <div className="simple-loader">
        <div className="simple-loader__block"/>
        <div className="simple-loader__block"/>
        <div className="simple-loader__block"/>
      </div>
    );
  }
}

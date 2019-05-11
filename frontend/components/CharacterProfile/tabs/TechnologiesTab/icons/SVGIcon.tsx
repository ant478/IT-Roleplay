import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default abstract class SVGIcon extends React.PureComponent {
  public componentDidMount(): void {
    const svg = ReactDOM.findDOMNode(this) as SVGGraphicsElement;
    const bbox = svg.getBBox();
    const viewBox = [
      Math.round(bbox.x),
      Math.round(bbox.y),
      Math.round(bbox.width),
      Math.round(bbox.height),
    ].join(' ');

    svg.setAttribute('viewBox', viewBox);
    svg.style.maxHeight = '100%';
    svg.style.width = 'auto';
  }

  public abstract render(): React.ReactNode;
}

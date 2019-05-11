import * as React from 'react';
import SVGIcon from './SVGIcon';

export default class AngularJS extends SVGIcon {
  public render(): React.ReactNode {
    return (
      <svg
        className="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 250 250"
        xmlSpace="preserve"
      >
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: '\n\t.angular-js-st0{fill:#DD0031;}\n\t.angular-js-st1{fill:#C3002F;}\n\t.angular-js-st2{fill:#FFFFFF;}\n' }}
        />
        <g>
          <polygon
            className="angular-js-st0"
            points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2  "
          />
          <polygon
            className="angular-js-st1"
            points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30  "
          />
          <path
            className="angular-js-st2"
            d="M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1   L125,52.1z M142,135.4H108l17-40.9L142,135.4z"
          />
        </g>
      </svg>
    );
  }
}

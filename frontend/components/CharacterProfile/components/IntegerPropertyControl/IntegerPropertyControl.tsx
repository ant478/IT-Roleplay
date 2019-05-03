import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';

interface IntegerPropertyControlProps {
  label: string;
  value: number;
  onMouseEnter: () => any;
  onDown: () => any;
  onUp: () => any;
  flags?: {
    canBeUpped?: boolean;
    canBeDowned?: boolean;
  };
}

export default class IntegerPropertyControl extends React.Component<IntegerPropertyControlProps, {}> {
  public shouldComponentUpdate(nextProps: IntegerPropertyControlProps): boolean {
    const props = this.props;

    const isLabelChanged = nextProps.label !== props.label;
    const isValueChanged = nextProps.value !== props.value;
    const areFlagsChanged = !_.isEqual(nextProps.flags, props.flags);

    return isLabelChanged || isValueChanged || areFlagsChanged;
  }

  public render(): React.ReactNode {
    const flags = this.props.flags || {};

    const controlClasses = classNames('integer-property-control', {
      'integer-property-control_can-be-upped': flags.canBeUpped,
      'integer-property-control_can-be-downed': flags.canBeDowned,
    });

    return (
      <div className={controlClasses} onMouseEnter={this.props.onMouseEnter}>
        <span className="integer-property-control__label">{this.props.label}</span>
        <div className="integer-property-control__value-area">
          <div className="integer-property-control__down" onClick={this.props.onDown}/>
          <span className="integer-property-control__value">{this.props.value}</span>
          <div className="integer-property-control__up" onClick={this.props.onUp}/>
        </div>
      </div>
    );
  }
}

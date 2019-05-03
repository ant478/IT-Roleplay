import * as _ from 'lodash';
import * as React from 'react';
import classNames from 'classnames';

interface RoleControlProps {
  label: string;
  value: number;
  onMouseEnter: () => any;
  onDown: () => any;
  onUp: () => any;
  flags?: {
    isJustAdded?: boolean;
    isNotAvailable?: boolean;
    canBeUpped?: boolean;
    canBeDowned?: boolean;
  };
}

export default class RoleControl extends React.Component<RoleControlProps, {}> {
  public shouldComponentUpdate(nextProps: RoleControlProps): boolean {
    const isLabelChanged = nextProps.label !== this.props.label;
    const isValueChanged = nextProps.value !== this.props.value;
    const areFlagsChanged = !_.isEqual(nextProps.flags, this.props.flags);

    return isLabelChanged || isValueChanged || areFlagsChanged;
  }

  public render(): React.ReactNode {
    const flags = this.props.flags || {};

    const controlClasses = classNames('role-control', {
      'role-control_is-just-added': flags.canBeDowned,
      'role-control_can-be-upped': flags.canBeUpped,
      'role-control_can-be-downed': flags.canBeDowned,
      'role-control_not-available': flags.isNotAvailable,
    });

    return (
      <div className={controlClasses} onMouseEnter={this.props.onMouseEnter}>
        <span className="role-control__label">{this.props.label}</span>
        <div className="role-control__value-area">
          <div className="role-control__down" onClick={this.props.onDown}/>
          <span className="role-control__value">{this.props.value}</span>
          <div className="role-control__up" onClick={this.props.onUp}/>
        </div>
      </div>
    );
  }
}

import * as React from 'react';

type CommonFormCheckboxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default class CommonFormCheckbox extends React.PureComponent<CommonFormCheckboxProps, {}> {
  public render(): React.ReactNode {
    return (
      <div className="common-form-checkbox">
        <input
          className="common-form-checkbox__input"
          type="checkbox"
          {...this.props}
        />
        <div className="common-form-checkbox__placeholder"/>
      </div>
    );
  }
}

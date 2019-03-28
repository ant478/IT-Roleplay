import _ from 'lodash';
import * as React from 'react';

interface BaseCommonFormProps {
  onSubmit: (data: any) => any;
  errors?: string[];
}

export default abstract class BaseCommonForm<PropsType extends BaseCommonFormProps, StateType> extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  public abstract render(): React.ReactNode;

  protected onFormSubmit(event: React.FormEvent): void {
    event.preventDefault();

    const userInput = _.pick(this.state, this.getPropertiesNames());

    this.props.onSubmit(userInput);
  }

  protected onInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value } as any);
  }

  protected renderErrors(): React.ReactNode[] | null {
    const errors = this.props.errors;

    if (!errors) {
      return null;
    }

    return errors.map((error, index) =>
      (<span key={index} className="common-form__error">{error}</span>),
    );
  }

  protected renderSubmit(text: string): React.ReactNode {
    return (
      <div className="common-form__submit-button-wrapper">
        <input className="common-form__submit-button" type="submit" value={text} />
      </div>
    );
  }

  protected abstract getPropertiesNames(): string[];
}

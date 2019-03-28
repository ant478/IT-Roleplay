import * as React from 'react';
import locale from '../../../services/LocalisationService';
import BaseCommonForm from '../BaseCommonForm';

export interface LoginFormData {
  login: string;
  password: string;
}

type LoginFormDataProperty = keyof LoginFormData;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => any;
  errors?: string[];
}

export default class LoginForm extends BaseCommonForm<LoginFormProps, LoginFormData> {
  constructor(props: LoginFormProps) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  public render(): React.ReactNode {
    return (
      <form className="common-form login-form" onSubmit={this.onFormSubmit} action="#" autoComplete="on" name="login-form">
        {this.renderErrors()}

        <label className="common-form__label">
          {locale.getMessage('login.formLabel.login')}
          <input
            className="common-form__imput"
            type="text"
            name="login"
            value={this.state.login}
            onChange={this.onInputChange}
            autoComplete="username"
            required={true}
          />
        </label>

        <label className="common-form__label">
          {locale.getMessage('login.formLabel.password')}
          <input
            className="common-form__imput"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onInputChange}
            autoComplete="current-password"
            required={true}
          />
        </label>

        {this.renderSubmit(locale.getMessage('login.formLabel.submit'))}
      </form>
    );
  }

  protected getPropertiesNames(): LoginFormDataProperty[] {
    return ['login', 'password'];
  }
}

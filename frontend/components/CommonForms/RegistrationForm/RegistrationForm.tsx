import * as React from 'react';
import locale from '../../../services/LocalisationService';
import BaseCommonForm from '../BaseCommonForm';
import CommonFormCheckbox from '../components/CommonFormCheckbox';

export interface RegistrationFormData {
  areTermsAccepted: boolean;
  email: string;
  login: string;
  password: string;
  passwordConfirmation: string;
}

type RegistrationFormDataProperty = keyof RegistrationFormData;

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => any;
  errors?: string[];
}

export default class RegistrationForm extends BaseCommonForm<RegistrationFormProps, RegistrationFormData> {
  constructor(props: RegistrationFormProps) {
    super(props);

    this.state = {
      areTermsAccepted: false,
      email: '',
      login: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  public render(): React.ReactNode {
    return (
      <form className="common-form registration-form" onSubmit={this.onFormSubmit} action="#" autoComplete="on" name="registration-form">
        {this.renderErrors()}

        <label className="common-form__label">
          {locale.getMessage('registration.formLabel.email')}
          <input
            className="common-form__imput"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onInputChange}
            autoComplete="email"
            required={true}
            spellCheck={false}
          />
        </label>

        <label className="common-form__label">
          {locale.getMessage('registration.formLabel.login')}
          <input
            className="common-form__imput"
            type="text"
            name="login"
            value={this.state.login}
            onChange={this.onInputChange}
            autoComplete="username"
            required={true}
            spellCheck={false}
          />
        </label>

        <label className="common-form__label">
          {locale.getMessage('registration.formLabel.password')}
          <input
            className="common-form__imput"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onInputChange}
            autoComplete="new-password"
            required={true}
            spellCheck={false}
          />
        </label>

        <label className="common-form__label">
          {locale.getMessage('registration.formLabel.passwordConfirmation')}
          <input
            className="common-form__imput"
            type="password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onInputChange}
            autoComplete="new-password"
            required={true}
            spellCheck={false}
          />
        </label>

        <label className="common-form__label common-form__label_single-checkbox">
          {locale.getMessage('registration.formLabel.areTermsAccepted')}
          <CommonFormCheckbox
            name="areTermsAccepted"
            checked={this.state.areTermsAccepted}
            onChange={this.onInputChange}
          />
        </label>

        {this.renderSubmit(locale.getMessage('registration.formLabel.submit'))}
      </form>
    );
  }

  protected getPropertiesNames(): RegistrationFormDataProperty[] {
    return ['areTermsAccepted', 'email', 'login', 'password', 'passwordConfirmation'];
  }
}

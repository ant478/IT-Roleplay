import _ from 'lodash';
import * as React from 'react';
import { RegistrationForm, RegistrationFormData } from '../../components/CommonForms';
import authService from '../../services/AuthService';
import locale from '../../services/LocalisationService';

interface RegistrationPageState {
  errors: string[];
  isSuccessfullyRegistered: boolean;
}

export default class Registration extends React.Component<{}, RegistrationPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      errors: [],
      isSuccessfullyRegistered: false,
    };

    this.onRegistrationFormSubmitted = this.onRegistrationFormSubmitted.bind(this);
  }

  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.registration');
  }

  public async onRegistrationFormSubmitted(userInput: RegistrationFormData): Promise<void> {
    if (!this.isUserInputValid(userInput)) {
      this.setState({ errors: [locale.getMessage('error.incorrectInput')] });
      return;
    }

    const registrationData = _.pick(userInput, ['login', 'email', 'password']);

    try {
      await authService.register(registrationData);
      this.setState({ isSuccessfullyRegistered: true });
    } catch (error) {
      this.setState({ errors: [error.message] });
    }
  }

  public renderRegistrationForm(): React.ReactNode | null {
    if (this.state.isSuccessfullyRegistered) {
      return null;
    }

    return (
      <RegistrationForm
        onSubmit={this.onRegistrationFormSubmitted}
        errors={this.state.errors}
      />
    );
  }

  public renderConfirmationMessage(): React.ReactNode | null {
    if (!this.state.isSuccessfullyRegistered) {
      return null;
    }

    return (
      <span className="registration-page__confirmation-message">
        {locale.getMessage('registration.success')}
      </span>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="page registration-page">
        <h1 className="registration-page__header">{locale.getMessage('registration.pageHeader')}</h1>
        <div className="registration-page__content-wrapper">
          {this.renderRegistrationForm()}
          {this.renderConfirmationMessage()}
        </div>
      </div>
    );
  }

  private isUserInputValid(_userInput: RegistrationFormData): boolean {
    return true; // TODO: share validation with backend
  }
}

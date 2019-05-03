import * as _ from 'lodash';
import * as React from 'react';
import { RegistrationForm, RegistrationFormData } from '../../components/CommonForms';
import authService from '../../services/Api/AuthService';
import locale from '../../services/LocalisationService';
import MainLoader from '../../components/MainLoader';
import { RouteComponentProps, match } from 'react-router-dom';
import OrangeScrollbar from '../../components/OrangeScrollbar';
import PageHeader from '../../components/PageHeader';

interface RegistrationPageState {
  errors: string[];
}

export default class RegistrationPage extends React.PureComponent<RouteComponentProps, RegistrationPageState> {
  public static async preload(_matchParams: match): Promise<{}> {
    return {};
  }

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.registration');
  }

  public onRegistrationFormSubmitted = async (userInput: RegistrationFormData): Promise<void> => {
    await MainLoader.withLoader(async () => {
      try {
        const registrationData = _.pick(userInput, ['login', 'email', 'password']);

        await authService.register(registrationData);

        const loginData = _.pick(userInput, ['login', 'password']);

        await authService.logIn(loginData);

        this.props.history.push('/characters/');
      } catch (error) {
        let errorMessage;

        if (error.code && error.code === 400) {
          errorMessage = locale.getMessage('registration.error.400');
        } else if (error.code && error.code === 409) {
          errorMessage = locale.getMessage('registration.error.409');
        } else {
          errorMessage = locale.getMessage('error.500');
        }

        this.setState({ errors: [errorMessage] });
      }
    });
  }

  public renderRegistrationForm(): React.ReactNode | null {
    return (
      <RegistrationForm
        onSubmit={this.onRegistrationFormSubmitted}
        errors={this.state.errors}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="page registration-page">
        <OrangeScrollbar>
          <PageHeader message={locale.getMessage('registration.pageHeader')}/>
          <div className="registration-page__content-wrapper">
            {this.renderRegistrationForm()}
          </div>
        </OrangeScrollbar>
      </div>
    );
  }
}

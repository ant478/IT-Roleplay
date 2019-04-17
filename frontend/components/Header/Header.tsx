import classNames from 'classnames';
import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/Api/AuthService';
import locale from '../../services/LocalisationService';
import { LoginForm, LoginFormData } from '../CommonForms';

interface HeaderState {
  isLoginFormExpanded: boolean;
  loginErrors: string[];
}

export default class Header extends React.Component<{}, HeaderState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoginFormExpanded: false,
      loginErrors: [],
    };

    this.onSubmitLoginForm = this.onSubmitLoginForm.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  public async onSubmitLoginForm(userInput: LoginFormData): Promise<void> {
    if (!this.isUserInputValid(userInput)) {
      this.setState({ loginErrors: [locale.getMessage('error.incorrectInput')] });
      return;
    }

    const loginData = _.pick(userInput, ['login', 'password']);

    try {
      await authService.logIn(loginData);
      window.location.reload();
    } catch (error) {
      this.setState({ loginErrors: [error.message] });
    }
  }

  public onLoginClick(_event: React.MouseEvent): void {
    this.setState({ isLoginFormExpanded: !this.state.isLoginFormExpanded });
  }

  public async onLogoutClick(_event: React.MouseEvent): Promise<void> {
    await authService.logOut();
    window.location.reload();
  }

  public renderLogo(): React.ReactNode {
    return (
      <div className="header__logo">
        <Link className="header__logo-link" to="/">
          <img className="header__logo-img" src="https://www.designfreelogoonline.com/wp-content/uploads/2015/05/00496-cat-logo-design-free-logomaker-01.png" />
        </Link>
      </div>
    );
  }

  public renderNavigationElement(location: string, text: string): React.ReactNode {
    const key = location.replace(/\//g, '_');

    return (
      <li key={key} className="header__navigation-element">
        <Link className="header__navigation-link" to={location}>{text}</Link>
      </li>
    );
  }

  public renderLoginButton(): React.ReactNode {
    const containerClassNames = classNames('header__login-form-container', {
      'header__login-form-container_expanded': this.state.isLoginFormExpanded,
    });

    return (
      <li key="login" className="header__navigation-element header__navigation-element_login">
        <a className="header__navigation-link" href="#" onClick={this.onLoginClick}>{locale.getMessage('navigation.login')}</a>
        <div className={containerClassNames}>
          <LoginForm onSubmit={this.onSubmitLoginForm} errors={this.state.loginErrors} />
        </div>
      </li>
    );
  }

  public renderLogoutButton(): React.ReactNode {
    return (
      <li key="logout" className="header__navigation-element" onClick={this.onLogoutClick}>
        <a className="header__navigation-link" href="#">{locale.getMessage('navigation.logout')}</a>
      </li>
    );
  }

  public renderNavigationElements(): React.ReactNode[] {
    if (!authService.isAuthenticated()) {
      return [
        this.renderNavigationElement('/characters', locale.getMessage('navigation.charactersList')),
        this.renderNavigationElement('/register', locale.getMessage('navigation.register')),
        this.renderLoginButton(),
      ];
    }

    return [
      this.renderNavigationElement('/characters', locale.getMessage('navigation.charactersList')),
      this.renderNavigationElement('/characters/new', locale.getMessage('navigation.newCharacter')),
      this.renderLogoutButton(),
    ];
  }

  public renderNavigation(): React.ReactNode {
    return (
      <nav className="header__navigation">
        <ul className="header__navigation-list">
          {this.renderNavigationElements()}
        </ul>
      </nav>
    );
  }

  public render(): React.ReactNode {
    return (
      <header className="header">
        {this.renderNavigation()}
        {this.renderLogo()}
      </header>
    );
  }

  private isUserInputValid(_userInput: LoginFormData): boolean {
    return true; // TODO: share validation with backend
  }
}

import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/Api/AuthService';
import locale from '../../services/LocalisationService';
import { LoginForm, LoginFormData } from '../CommonForms';
import classNames from 'classnames';
import MainLoader from '../../components/MainLoader';

interface HeaderProps {
  onCurrentUserChanged: () => any;
}

interface HeaderState {
  isLoginFormExpanded: boolean;
  loginErrors: string[];
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  private loginFormContainer = React.createRef<HTMLLIElement>();

  constructor(props: HeaderProps) {
    super(props);

    this.state = {
      isLoginFormExpanded: false,
      loginErrors: [],
    };
  }

  public componentDidMount(): void {
    document.addEventListener('click', this.handleClick, true);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('click', this.handleClick, true);
  }

  public handleClick = (event: MouseEvent): void => {
    if (!this.loginFormContainer.current || !this.state.isLoginFormExpanded) {
      return;
    }

    const isClickOutsideLoginForm = !this.loginFormContainer.current.contains(event.target as Element);

    if (isClickOutsideLoginForm) {
      this.setState({
        isLoginFormExpanded: false,
        loginErrors: [],
      });
    }
  }

  public onSubmitLoginForm = async (userInput: LoginFormData): Promise<void> => {
    const loginData = _.pick(userInput, ['login', 'password']);

    await MainLoader.withLoader(() =>
      authService.logIn(loginData).then(() => {
        this.props.onCurrentUserChanged();
      }).then(() => {
        this.setState({ isLoginFormExpanded: false });
      }).catch((error) => {
        const errorMessage = error.code && error.code === 400 ?
          locale.getMessage('login.error.400') :
          locale.getMessage('error.500');

        this.setState({
          loginErrors: [errorMessage],
        });
      }),
    );
  }

  public onLoginClick = (event: React.MouseEvent): void => {
    event.preventDefault();

    this.setState({
      isLoginFormExpanded: !this.state.isLoginFormExpanded,
      loginErrors: [],
    });
  }

  public onLogoutClick = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    await MainLoader.withLoader(() =>
      authService.logOut().then(() => {
        this.props.onCurrentUserChanged();
      }),
    );
  }

  public renderStatus(): React.ReactNode {
    const classes = classNames('header__status', {
      header__status_authenticated: authService.isAuthenticated(),
    });

    const message = authService.isAuthenticated() ?
      locale.getMessage('header.status.authenticated', { login: authService.getCurrentUser().login }) :
      locale.getMessage('header.status.notAuthenticated');

    return (
      <div className={classes}>
        <span className="header__status-message">{message}</span>
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

  public renderLoginForm(): React.ReactNode {
    const classes = classNames('header__login-form-container', {
      'header__login-form-container_expanded': this.state.isLoginFormExpanded,
    });

    return (
      <div className={classes}>
        <LoginForm onSubmit={this.onSubmitLoginForm} errors={this.state.loginErrors} />
      </div>
    );
  }

  public renderLoginButton(): React.ReactNode {
    return (
      <li key="login" className="header__navigation-element header__navigation-element_login" ref={this.loginFormContainer}>
        <a className="header__navigation-link" href="#" onClick={this.onLoginClick}>{locale.getMessage('header.navigation.login')}</a>
        {this.renderLoginForm()}
      </li>
    );
  }

  public renderLogoutButton(): React.ReactNode {
    return (
      <li key="logout" className="header__navigation-element" onClick={this.onLogoutClick}>
        <a className="header__navigation-link" href="#">{locale.getMessage('header.navigation.logout')}</a>
      </li>
    );
  }

  public renderNavigationElements(): React.ReactNode[] {
    if (!authService.isAuthenticated()) {
      return [
        this.renderNavigationElement('/characters', locale.getMessage('header.navigation.charactersList')),
        this.renderNavigationElement('/register', locale.getMessage('header.navigation.register')),
        this.renderLoginButton(),
      ];
    }

    return [
      this.renderNavigationElement('/characters', locale.getMessage('header.navigation.charactersList')),
      this.renderNavigationElement('/characters/new', locale.getMessage('header.navigation.newCharacter')),
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
        {this.renderStatus()}
        {this.renderNavigation()}
      </header>
    );
  }
}

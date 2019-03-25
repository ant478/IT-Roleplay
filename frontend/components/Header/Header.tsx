import * as React from 'react';
import authService from '../../services/AuthService';

export default class Header extends React.Component {
  public renderLogo(): React.ReactNode {
    return (
      <div className="header__logo">
        <a className="header__logo-link" href="/">
          <img className="header__logo-img" src="https://www.designfreelogoonline.com/wp-content/uploads/2015/05/00496-cat-logo-design-free-logomaker-01.png" />
        </a>
      </div>
    );
  }

  public renderNavigationElement(href: string, text: string): React.ReactNode {
    const key = href.replace(/\//g, '_');

    return (
      <li key={key} className="header__navigation-element">
        <a className="header__navigation-link" href={href}>{text}</a>
      </li>
    );
  }

  public renderNavigationElements(): React.ReactNode[] {
    if (!authService.isAuthenticated()) {
      return [
        this.renderNavigationElement('/characters', 'Список персонажей'),
        this.renderNavigationElement('/register', 'Регистрация'),
        this.renderNavigationElement('#', 'Вход'),
      ];
    }

    return [
      this.renderNavigationElement('/characters', 'Список персонажей'),
      this.renderNavigationElement('/characters/new', 'Создать персонажа'),
      this.renderNavigationElement('#', 'Выход'),
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
}

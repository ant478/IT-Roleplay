import * as React from 'react';
import locale from '../../services/LocalisationService';

export default class Home extends React.Component {
  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.home');
  }

  public render(): React.ReactNode {
    return (
      <div className="page home-page">
        <h1>Home page</h1>
      </div>
    );
  }
}

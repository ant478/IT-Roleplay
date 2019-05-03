import * as React from 'react';
import locale from '../../services/LocalisationService';
import PageHeader from '../../components/PageHeader';
import { match, Redirect } from 'react-router-dom';

export default class HomePage extends React.PureComponent {
  public static async preload(_matchParams: match): Promise<{}> {
    return {};
  }

  public componentDidMount(): void {
    document.title = locale.getMessage('pageTitle.home');
  }

  public render(): React.ReactNode { // not yet implemented
    return (
      <div className="page home-page">
        <PageHeader message="Home Page"/>
        <Redirect to="/characters/"/>
      </div>
    );
  }
}

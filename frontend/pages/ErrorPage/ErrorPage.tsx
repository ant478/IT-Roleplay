import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import locale from '../../services/LocalisationService';

export default class ErrorPage extends React.Component<RouteComponentProps, {}> {
  public render(): React.ReactNode {
    return (
      <div className="page error-page">
        <div className="error-page__content-wrapper">
          <div className="error-page__error-message">
            {locale.getMessage('errorPage.errorMessageText')}
          </div>
        </div>
      </div>
    );
  }
}

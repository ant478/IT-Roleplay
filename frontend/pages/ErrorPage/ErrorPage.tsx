import * as React from 'react';
import { RouteComponentProps, match } from 'react-router-dom';
import MainLoader from '../../components/MainLoader';

export default class ErrorPage extends React.PureComponent<RouteComponentProps, {}> {
  public static async preload(_matchParams: match): Promise<{}> {
    return {};
  }

  public componentDidMount(): void {
    MainLoader.hide();
  }

  public render(): React.ReactNode {
    return (
      <div className="page error-page"/>
    );
  }
}

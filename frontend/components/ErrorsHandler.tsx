import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ErrorsHandlerProps extends RouteComponentProps {
  redirectPath: string;
}

const ErrorsHandlesClass = class ErrorsHandler extends React.Component<ErrorsHandlerProps, {}> {
  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.handleError({ error, info });
  }

  public componentDidMount(): void {
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      this.handleError({ msg, url, lineNo, columnNo, error });

      return true;
    };

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({ promise: event.promise, reason: event.reason });

      event.preventDefault();
    });
  }

  public render(): React.ReactNode {
    return this.props.children;
  }

  private handleError(error: any): void {
    // tslint:disable-next-line:no-console
    console.log(error);

    this.props.history.push(this.props.redirectPath);
  }
};

export default withRouter(ErrorsHandlesClass);

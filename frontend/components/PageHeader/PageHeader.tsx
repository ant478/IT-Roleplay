import * as React from 'react';

interface PageHeaderProps {
  message: string;
}

export default class PageHeader extends React.PureComponent<PageHeaderProps, {}> {
  public render(): React.ReactNode {
    return (
      <h1 className="page-header">
        {this.props.message}
      </h1>
    );
  }
}

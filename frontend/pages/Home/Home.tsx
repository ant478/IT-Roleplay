import * as React from 'react';

export default class Home extends React.Component {
  public async componentDidMount(): Promise<void> {
    document.title = 'IT Roleplay';
  }

  public render(): React.ReactNode {
    return (
      <div className="page home-page">
        <h1>Home page</h1>
      </div>
    );
  }
}

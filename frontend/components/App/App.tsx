import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Character from '../../pages/Character';
import Characters from '../../pages/Characters';
import Home from '../../pages/Home';
import Registration from '../../pages/Registration';

const redirectHome = () => <Redirect to="/" />;

export default class App extends React.Component {
  public renderMain(): React.ReactNode {
    return (
      <main className="main">
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/register" component={Registration} />
          <Route exact={true} path="/characters" component={Characters} />
          <Route path="/characters/:characterId" component={Character} />
          <Route component={redirectHome} />
        </Switch>
      </main>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="app">
        <Header />
        {this.renderMain()}
        <Footer />
      </div>
    );
  }
}

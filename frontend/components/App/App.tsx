import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Character from '../../pages/Character';
import Characters from '../../pages/Characters';
import Home from '../../pages/Home';
import Registration from '../../pages/Registration';

const redirectHome = () => <Redirect to="/" />;

export default class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <div id="app">
        <main>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/register" component={Registration} />
            <Route exact={true} path="/characters" component={Characters} />
            <Route path="/characters/:characterId" component={Character} />
            <Route component={redirectHome} />
          </Switch>
        </main>
      </div>
    );
  }
}

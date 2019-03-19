import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Characters from '../../pages/Characters';
import Registration from '../../pages/Registration';
import Character from '../../pages/Character';

const RedirectHome = () => <Redirect to="/" />;

export default class App extends React.Component {
  render() {
    return (
      <div id="app">
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Registration} />
            <Route exact path="/characters" component={Characters} />
            <Route path="/characters/:characterId" component={Character} />
            <Route component={RedirectHome} />
          </Switch>
        </main>
      </div>
    );
  }
}

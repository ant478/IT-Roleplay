import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Characters from '../../pages/Characters';

export default class App extends React.Component {
  render() {
    return (
      <div id="app">
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/characters" component={Characters} />
          </Switch>
        </main>
      </div>
    );
  }
}

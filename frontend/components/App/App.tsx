import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CharacterPage from '../../pages/CharacterPage';
import CharactersPage from '../../pages/CharactersPage';
import HomePage from '../../pages/HomePage';
import RegistrationPage from '../../pages/RegistrationPage';

const redirectHome = () => <Redirect to="/" />;

export default class App extends React.Component {
  public renderMain(): React.ReactNode {
    return (
      <main className="main">
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/register" component={RegistrationPage} />
          <Route exact={true} path="/characters" component={CharactersPage} />
          <Route path="/characters/:characterId" component={CharacterPage} />
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

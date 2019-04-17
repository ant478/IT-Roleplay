import * as React from 'react';
import authService from '../../services/Api/AuthService';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MouseFollowingPopup from '../../components/MouseFollowingPopup';
import CharacterPage from '../../pages/CharacterPage';
import NewCharacterPage from '../../pages/NewCharacterPage';
import CharactersPage from '../../pages/CharactersPage';
import HomePage from '../../pages/HomePage';
import RegistrationPage from '../../pages/RegistrationPage';
import ErrorPage from '../../pages/ErrorPage';
import ErrorsHandler from '../../components/ErrorsHandler';

const redirectHome = () => <Redirect to="/" />;

const PrivateRoute = ({ component: Component, ...rest }: { component: React.ComponentClass<any, any>, [key: string]: any }) => {
  const redirectAuthenticatedOrRedirect = (props: any) => (
    authService.isAuthenticated() ? (<Component {...props}/>) : (<Redirect to="/"/>)
  );

  return (<Route {...rest} render={redirectAuthenticatedOrRedirect}/>);
};

interface AppState {
  isLoading: boolean;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    await authService.validateUserSession();

    this.setState({ isLoading: false });
  }

  public renderMain(): React.ReactNode {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <main className="main">
        <ErrorsHandler redirectPath="/error">
          <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route path="/register" component={RegistrationPage} />
            <Route exact={true} path="/characters" component={CharactersPage} />
            <PrivateRoute exact={true} path="/characters/new" component={NewCharacterPage} />
            <Route path="/characters/:characterId" component={CharacterPage} />
            <Route exact={true} path="/error" component={ErrorPage} />
            <Route component={redirectHome} />
          </Switch>
        </ErrorsHandler>
      </main>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="app">
        <Header />
        {this.renderMain()}
        <Footer />
        <MouseFollowingPopup />
      </div>
    );
  }
}

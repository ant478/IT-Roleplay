import * as React from 'react';
import authService, { User } from '../../services/Api/AuthService';
import { Redirect, Route, Switch, withRouter, RouteComponentProps, matchPath } from 'react-router-dom';
import Header from '../../components/Header';
import MouseFollowingPopup from '../../components/MouseFollowingPopup';
import MainLoader from '../../components/MainLoader';
import HighTechContainer from '../../components/HighTechContainer';
import UndergroundBroadcast from '../../components/UndergroundBroadcast';
import ErrorsHandler from '../ErrorsHandler/ErrorsHandler';
import routeConfigs from './routeConfigs';
import ExtendedRoute from '../ExtendedRoute';

const redirectHome = () => <Redirect to="/characters" />; // <Redirect to="/" />;
const isAuthenticated = () => authService.isAuthenticated();
const isNotAuthenticated = () => !authService.isAuthenticated();

interface AppState {
  isPreloading: boolean;
  preloadedProps: any;
  currentUser: User | null;
}

const AppClass = class App extends React.Component<RouteComponentProps, AppState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      isPreloading: true,
      preloadedProps: {},
      currentUser: authService.getCurrentUser(),
    };
  }

  public onCurrentUserChanged = (): void => {
    this.setState({ currentUser: authService.getCurrentUser() });
  }

  public shouldComponentUpdate(_nextProps: RouteComponentProps, nextState: AppState): boolean {
    return !nextState.isPreloading;
  }

  public async componentWillReceiveProps(nextProps: RouteComponentProps): Promise<void> {
    if (nextProps.location.pathname === this.props.location.pathname) {
      return;
    }

    await MainLoader.withLoader(() =>
      this.preloadNextRoute(nextProps),
    );
  }

  public async componentDidMount(): Promise<void> {
    const validatingUserSession = authService.validateUserSession().catch(() => {
      this.onCurrentUserChanged();
    });
    const preloadingNextRoute = this.preloadNextRoute(this.props);

    await MainLoader.withLoader(() =>
      Promise.all([validatingUserSession, preloadingNextRoute]),
    );
  }

  public renderMain(): React.ReactNode {
    if (this.state.isPreloading) {
      return null;
    }

    return (
      <main className="main">
        <Switch>
          {/*<ExtendedRoute {...routeConfigs.homePage} preloadedProps={this.state.preloadedProps}/> not yet implemented*/}
          <ExtendedRoute {...routeConfigs.registrationPage} condition={isNotAuthenticated} preloadedProps={this.state.preloadedProps} />
          <ExtendedRoute {...routeConfigs.charactersPage} preloadedProps={this.state.preloadedProps} />
          <ExtendedRoute {...routeConfigs.newCharacterPage} condition={isAuthenticated} preloadedProps={this.state.preloadedProps} />
          <ExtendedRoute {...routeConfigs.characterPage} preloadedProps={this.state.preloadedProps} />
          <ExtendedRoute {...routeConfigs.errorPage} preloadedProps={this.state.preloadedProps} />
          <Route component={redirectHome} />
        </Switch>
      </main>
    );
  }

  public render(): React.ReactNode {
    return (
      <div className="app">
        <HighTechContainer backSide={UndergroundBroadcast}>
          <ErrorsHandler redirectPath="/error">
            <MainLoader isInitiallyDisplayed={true}/>
            <Header onCurrentUserChanged={this.onCurrentUserChanged}/>
            {this.renderMain()}
          </ErrorsHandler>
        </HighTechContainer>
        <MouseFollowingPopup />
      </div>
    );
  }

  private async preloadNextRoute(nextProps: RouteComponentProps): Promise<void> {
    const matchingRouteConfig = Object.values(routeConfigs).find(config => !!matchPath(nextProps.location.pathname, config));
    const Component = matchingRouteConfig ? matchingRouteConfig.component : null;

    if (!Component) {
      this.setState({
        isPreloading: false,
        preloadedProps: {},
      });

      return;
    }

    this.setState({ isPreloading: true });

    const matchParams = matchPath(nextProps.location.pathname, matchingRouteConfig!)!;
    const preloadedProps = await Component.preload(matchParams);

    this.setState({
      preloadedProps,
      isPreloading: false,
    });
  }
};

export default withRouter(AppClass);

import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface ExtendedRouteProps extends RouteProps {
  preloadedProps?: Record<string, any>;
  condition?: () => boolean;
}

const ExtendedRoute: React.FunctionComponent<ExtendedRouteProps> = (extendedRouteProps: ExtendedRouteProps): JSX.Element => {
  const { component, condition, preloadedProps, ...rest } = extendedRouteProps;
  const Component = component as React.ComponentType;

  const render = (props: Record<string, any>) => {
    const componentProps = { ...props, ...preloadedProps };

    if (condition) {
      return condition() ?
        (<Component {...componentProps}/>) :
        (<Redirect to="/characters/"/>);
    }

    return (<Component {...componentProps}/>);
  };

  return (<Route {...rest} render={render}/>);
};

export default ExtendedRoute;

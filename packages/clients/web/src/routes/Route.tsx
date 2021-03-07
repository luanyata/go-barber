import React, { FunctionComponent, ComponentType } from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrvate?: boolean;
  component: ComponentType;
}

const Route: FunctionComponent<RouteProps> = ({
  isPrvate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrvate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrvate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

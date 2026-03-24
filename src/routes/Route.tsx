import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  bypassAuth?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  bypassAuth = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (bypassAuth) return <Component />;

        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: isPrivate ? '/' : 'dashboard', state: location }}
          />
        );
      }}
    />
  );
};

export default Route;

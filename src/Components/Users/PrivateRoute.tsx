import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAppSelector from '../Access/hooks';

const ProtectedRoute: FC<RouteProps> = ({ path, children, ...rest }) => {
  const { loggedIn } = useAppSelector(state => state.person);
  return (
    <Route
      path={path}
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

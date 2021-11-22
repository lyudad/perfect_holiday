import { Route, RouteProps, Redirect } from 'react-router-dom';

interface Props extends RouteProps {
  restricted: boolean;
  path: string;
  exact: boolean;
  isAuth: boolean;
}

const PublicRoutes = ({ isAuth, restricted, path, exact, component }: Props) =>
  isAuth && restricted ? (
    <Redirect to="/login" />
  ) : (
    <Route path={path} exact={exact} component={component} />
  );

export default PublicRoutes;

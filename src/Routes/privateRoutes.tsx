import { Redirect, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  isAuth: boolean;
}

const PrivatRoutes = ({ isAuth, path, exact, component }: Props) =>
  isAuth ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/login" />
  );

export default PrivatRoutes;

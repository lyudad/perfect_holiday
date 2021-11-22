import { QueryClient, QueryClientProvider } from 'react-query';
import { RouteComponentProps, Switch } from 'react-router-dom';
import Container from './Components/Container';
import PublicRoutes from 'Routes/publicRoutes';
import PrivatRoutes from 'Routes/privateRoutes';
import { mainRoutes } from 'Routes/mainRoutes';
import { ComponentType } from 'react';
const queryClient = new QueryClient();

interface Props {
  isPrivate: boolean;
  restricted: boolean;
  path: string;
  exact: boolean;
  component: ComponentType<RouteComponentProps<never>>;
}

function App(): JSX.Element {
  const isAuth = true;

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Switch>
          {mainRoutes.map(
            ({ path, exact, component, isPrivate, restricted }: Props) =>
              isPrivate ? (
                <PrivatRoutes
                  isAuth={isAuth}
                  path={path}
                  exact={exact}
                  component={component}
                  key={path}
                />
              ) : (
                <PublicRoutes
                  isAuth={isAuth}
                  path={path}
                  exact={exact}
                  component={component}
                  restricted={restricted}
                  key={path}
                />
              ),
          )}
        </Switch>
      </Container>
    </QueryClientProvider>
  );
}

export default App;

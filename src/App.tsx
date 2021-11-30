import { QueryClient, QueryClientProvider } from 'react-query';
import { Switch, Route } from 'react-router-dom';
import Container from './Components/Container';
import LoginView from './views/login';
import Dashbord from './Components/Dashbord';
import UserView from './views/user';
import SuperView from 'views/SuperView';
import AdminView from './views/AdminView';
import Users from './Components/Users';
import Calendar from 'Components/Calendar';
import { NotFound } from 'Components/404';
import { Provider } from 'react-redux';
import store, { persistor } from 'Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Container>
            <Switch>
              <Route path="/login">
                <LoginView />
              </Route>
              <Route exact path="/admin/:id" component={SuperView} />
              <Route exact path="/admin/:id" component={AdminView} />
              <Route exact path="/booking/:id" component={Calendar} />
              <Route path="/dashbord">
                <Dashbord />
              </Route>
              <Route path="/user">
                <UserView />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Container>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

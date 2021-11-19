import { QueryClient, QueryClientProvider } from 'react-query';
import { Switch, Route } from 'react-router-dom';
import Container from './Components/Container';
import LoginView from './views/login';
import Dashbord from './Components/Dashbord';
import UserView from './views/user';
import AdminView from './views/AdminView';
import Users from './Components/Users';
import Calendar from 'Components/Calendar';
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Switch>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route exact path="/admin/:userId" component={AdminView} />
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
        </Switch>
      </Container>
    </QueryClientProvider>
  );
}

export default App;

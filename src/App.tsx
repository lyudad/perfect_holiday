import Container from './Components/Container';
import { QueryClient, QueryClientProvider } from 'react-query';
import Users from 'Components/Users';
import { Switch, Route } from "react-router-dom";
import AdminView from "./views/AdminView/AdminView";
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
<QueryClientProvider client={queryClient}>
    <Container>
      <Switch>
        <Route exact path="/admin-page" component={AdminView} />
      </Switch>
    </Container>
    </QueryClientProvider>
  );
}

export default App;

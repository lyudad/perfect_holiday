import { Switch, Route } from "react-router-dom";
import Container from "./Components/Container";
import LoginView from "./views/login";
import Dashbord from "./Components/Dashbord";
import UserView from "./views/user";
import AdminView from "./views/AdminView";
import Users from "./Components/Users";

function App(): JSX.Element {
  return (
    <Container>
      <Switch>
        <Route path="/login">
          <LoginView />
        </Route>
        <Route path="/admin">
          <AdminView />
        </Route>
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
  );
}

export default App;

import { Switch, Route } from "react-router-dom";

import Container from "./Components/Container";

import AdminView from "./views/AdminView/AdminView";

function App(): JSX.Element {
  return (
    <Container>
      <Switch>
        <Route exact path="/admin-page" component={AdminView} />
      </Switch>

export default App;

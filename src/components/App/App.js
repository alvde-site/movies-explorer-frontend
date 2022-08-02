import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/movies">
          </Route>
          <Route path="/saved-movies">
          </Route>
          <Route path="/profile">
          </Route>
          <Route path="/signin">
          </Route>
          <Route path="/signup">
          </Route>
          <Route path="*">
          <PageNotFound />
          </Route>
        </Switch>
      </div>
  );
}

export default App;


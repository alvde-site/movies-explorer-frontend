import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";
import AuthLInks from "./Header/AuthLinks/AuthLinks";


function App() {
  return (
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main headerLinks={<AuthLInks />}/>
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
  );
}

export default App;


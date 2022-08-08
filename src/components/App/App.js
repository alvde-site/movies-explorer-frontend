import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {cardsData} from "../../utils/constants";

function App() {
  const loggedIn = true;
  const [isToggleBurger, setIsToggleBurger] = useState(false);
  const [isToggleMoviesFilter, setIsToggleMoviesFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (loggedIn) {
      setCards(cardsData);
    }
  }, [loggedIn]);

  function handleToggleBurger() {
    console.log("нажал");
    setIsToggleBurger(!isToggleBurger);
  }

  function handleToggleFilter() {
    setIsToggleMoviesFilter(!isToggleMoviesFilter);
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/movies">
          <Movies
            loggedIn={loggedIn}
            onToggleBurger={handleToggleBurger}
            isToggleBurger={isToggleBurger}
            onToggleFilter={handleToggleFilter}
            isToggleFilter={isToggleMoviesFilter}
            cardsData={cards}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            loggedIn={loggedIn}
            onToggleBurger={handleToggleBurger}
            isToggleBurger={isToggleBurger}
          />
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

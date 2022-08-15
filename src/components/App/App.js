import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { cardsData } from "../../utils/constants";
import { usersData } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { MainApiSet } from "../../utils/MainApi";
import { MoviesApiSet } from "../../utils/MoviesApi";

function App() {
  const loggedIn = true;
  const [isToggleBurger, setIsToggleBurger] = useState(false);
  const [isToggleMoviesFilter, setIsToggleMoviesFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const [isSavedCards, setIsSavedCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isInitialMovies, setiIsInitialMovies] = useState([]);
  const [isEmptySearchValue, setIsEmptySearchValue] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setCards(cardsData);
      setCurrentUser(usersData);
    }
  }, [loggedIn]);

  function handleToggleBurger() {
    setIsToggleBurger(!isToggleBurger);
  }

  function handleToggleFilter() {
    setIsToggleMoviesFilter(!isToggleMoviesFilter);
  }

  function handleSelectMovie(card) {
    if (!card.isClicked) {
      card.isClicked = true;
      setIsSavedCards([...isSavedCards, card]);
    } else {
      card.isClicked = false;
    }
    setIsSavedCards((state) => state.filter((c) => c.isClicked));
    setCards((state) => state.map((c) => (c._id === card._id ? card : c)));
  }

  function handleSearchMovie(value) {
    if(!value) {
      setIsEmptySearchValue(true);
      return;
    } else {
      setIsEmptySearchValue(false);
    }
    MoviesApiSet.getInitialMovies()
      .then((res) => {
        if (!isInitialMovies.length) {
          setiIsInitialMovies(res);
          return res
        } else {
          return isInitialMovies;
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {});
  }

  function handleSearchSavedMovie(value) {
    console.log(value);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* Поддерево, в котором будет доступен контекст */}
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
              onToggleBurger={handleToggleBurger}
              isToggleBurger={isToggleBurger}
            />
          </Route>
          <Route path="/movies">
            <Movies
              loggedIn={loggedIn}
              onToggleBurger={handleToggleBurger}
              isToggleBurger={isToggleBurger}
              onToggleFilter={handleToggleFilter}
              isToggleFilter={isToggleMoviesFilter}
              cardsData={cards}
              onSelect={handleSelectMovie}
              onSearch={handleSearchMovie}
              isEmptyValue={isEmptySearchValue}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              loggedIn={loggedIn}
              onToggleBurger={handleToggleBurger}
              isToggleBurger={isToggleBurger}
              onToggleFilter={handleToggleFilter}
              isToggleFilter={isToggleMoviesFilter}
              onSelect={handleSelectMovie}
              cardsData={isSavedCards}
              onSearch={handleSearchSavedMovie}
              isEmptyValue={isEmptySearchValue}
            />
          </Route>
          <Route path="/profile">
            <Profile
              loggedIn={loggedIn}
              onToggleBurger={handleToggleBurger}
              isToggleBurger={isToggleBurger}
            />
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
    </CurrentUserContext.Provider>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";
// import { cardsData } from "../../utils/constants";
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
  const [initialMovies, setInitialMovies] = useState([]);
  const [isEmptySearchValue, setIsEmptySearchValue] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);
  const [notFoundMoviesText, setIsNotFoundMoviesText] = useState("");
  const [numberOfMovies, setNumberOfMovies] = useState(16);
  const [deviceWidth, setDeviceWidth] = useState(1280);
  const [isDisableMoreButton, setIsDisableMoreButton] = useState(false);
  // const [isShortMovies, setIsShortMovies] = useState([]);

  const updateDeviceWidth = () => {
    const timer = setTimeout(() => {
      setDeviceWidth(Math.max(window.screen.width, window.innerWidth));
    }, 1000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDeviceWidth);
    return () => window.removeEventListener("resize", updateDeviceWidth);
  });

  useEffect(() => {
    setDeviceWidth(Math.max(window.screen.width, window.innerWidth));
    handleNumberOfMovies(deviceWidth);
  }, [deviceWidth]);

  function handleNumberOfMovies(width) {
    if (width >= 1280) {
      setNumberOfMovies(16);
    } else if (1280 < width || width >= 990) {
      setNumberOfMovies(12);
    } else {
      setNumberOfMovies(8);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      if (JSON.parse(localStorage.getItem("movies"))) {
        setCards(
          JSON.parse(localStorage.getItem("movies")).slice(0, numberOfMovies)
        );
      } else {
        setIsDisableMoreButton(true);
      }
      if (localStorage.moviessetting) {
        setIsToggleMoviesFilter(
          JSON.parse(localStorage.moviessetting).isToggleMoviesFilter
        );
        setSearch(JSON.parse(localStorage.moviessetting).value);
      }
      setCurrentUser(usersData);
    }
  }, [loggedIn, numberOfMovies]);

  function handleAddMovies() {
    if (deviceWidth >= 1280) {
      setNumberOfMovies(numberOfMovies + 4);
    } else if (1280 < deviceWidth || deviceWidth >= 990) {
      setNumberOfMovies(numberOfMovies + 3);
    } else {
      setNumberOfMovies(numberOfMovies + 2);
    }

    handleDisableMoreButton(numberOfMovies, cards);
  }

  function handleDisableMoreButton(count, movies) {
    setIsDisableMoreButton(() => count > movies.length);
  }

  function handleToggleBurger() {
    setIsToggleBurger(!isToggleBurger);
  }

  function handleToggleFilter() {
    setIsToggleMoviesFilter(!isToggleMoviesFilter);
    const shortMovies = JSON.parse(localStorage.movies).filter(
      (m) => m.duration <= 40
    );
    setCards(() => {
      return !isToggleMoviesFilter
        ? shortMovies
        : JSON.parse(localStorage.movies);
    });
    // handleDisableMoreButton(numberOfMovies, JSON.parse(localStorage.movies));
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

  function handleSavedStates(foundMovies) {
    handleDisableMoreButton(numberOfMovies, foundMovies);
    setDeviceWidth(Math.max(window.screen.width, window.innerWidth));
    handleNumberOfMovies(deviceWidth);
    setCards(
      JSON.parse(localStorage.getItem("movies")).slice(0, numberOfMovies)
    );
    setIsToggleMoviesFilter(
      JSON.parse(localStorage.moviessetting).isToggleMoviesFilter
    );
    setSearch(JSON.parse(localStorage.moviessetting).value);
  }

  function handleSaveToLocalStorage(movies, val){
    localStorage.setItem("movies", JSON.stringify(movies));
          localStorage.setItem(
            "moviessetting",
            JSON.stringify({ isToggleMoviesFilter, val })
          );
  }


  function handleSearchMovie(value) {
    // Проверка на отсутствие ключевого слова для поиска фильма
    if (!value) {
      setIsEmptySearchValue(true);
      return;
    } else {
      setIsEmptySearchValue(false);
    }

    setIsLoading(true);

    if (!initialMovies.length) {
      // Проверяем - загружены ли фильмы по умолчанию
      MoviesApiSet.getInitialMovies()
        .then((movies) => {
          const formattedMovies = movies.map(
            //  Сохраняем массив фильмом в моем формате
            ({
              id,
              country,
              director,
              duration,
              year,
              description,
              image,
              trailerLink,
              nameRU,
              nameEN,
            }) => {
              return {
                movieId: id,
                country,
                director,
                duration,
                year,
                description,
                image: `https://api.nomoreparties.co${image.url}`,
                trailerLink,
                thumbnail: `https://api.nomoreparties.co${image.url}`,
                owner: "62e64f626edb3e7531ece9fd",
                nameRU,
                nameEN,
              };
            }
          );

          setInitialMovies(formattedMovies);
          const foundMovies = formattedMovies.filter((m) =>
            m.nameRU.toLowerCase().includes(value.toLowerCase())
          );
          handleSaveToLocalStorage(foundMovies, value)
          if (!foundMovies.length) {
            handleDisableMoreButton(numberOfMovies, foundMovies);
            handleNumberOfMovies(deviceWidth);
            setCards(foundMovies.slice(0, numberOfMovies));
            setIsNotFoundMoviesText("Ничего не найдено");
            setIsNotFoundMovies(true);
            return;
          }
          handleDisableMoreButton(numberOfMovies, foundMovies);
          handleNumberOfMovies(deviceWidth);
          setCards(foundMovies.slice(0, numberOfMovies));
          setIsNotFoundMovies(false);
          setIsToggleMoviesFilter(
            JSON.parse(localStorage.moviessetting).isToggleMoviesFilter
          );
          setSearch(JSON.parse(localStorage.moviessetting).value);
        })
        .catch((err) => {
          setIsNotFoundMoviesText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          setIsNotFoundMovies(true);
          console.log(`${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const foundMovies = initialMovies.filter((m) =>
        m.nameRU.toLowerCase().includes(value.toLowerCase())
      );
      handleSaveToLocalStorage(foundMovies, value);
      setIsLoading(false);

      if (!foundMovies.length) {
        handleSavedStates(foundMovies);
        setIsNotFoundMoviesText("Ничего не найдено");
        setIsNotFoundMovies(true);
      } else {
        handleSavedStates(foundMovies);
        setIsNotFoundMovies(false);
      }
    }
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
              searchValue={search}
              onSearchValue={setSearch}
              isLoading={isLoading}
              isNotFoundMovies={isNotFoundMovies}
              notFoundMoviesText={notFoundMoviesText}
              onAddMovies={handleAddMovies}
              isDisableMoreButton={isDisableMoreButton}
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

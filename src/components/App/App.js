import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MainApiSet } from "../../utils/MainApi";
import { MoviesApiSet } from "../../utils/MoviesApi";
import { useFormWithValidation } from "../../utils/formValidator";
import { /*Route, Switch, Redirect,*/ useHistory } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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
  const [submitError, setSubmitError] = useState("");
  const [isEditProfile, setIsEditProfile] = useState(false);

  const history = useHistory();
  const { values, handleChange, errors, isValid /*resetForm*/ } =
    useFormWithValidation();

  const updateDeviceWidth = () => {
    const timer = setTimeout(() => {
      setDeviceWidth(Math.max(window.screen.width, window.innerWidth));
    }, 1000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      // здесь будем проверять токен
      if (jwt) {
        // проверим токен
        MainApiSet.getCurrentUser()
          .then((res) => {
            if (res) {
              setLoggedIn(true);
            }
          })
          .catch((err) => {
            console.log(`${err}`);
          });
      }
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([MainApiSet.getCurrentUser(), MainApiSet.getMovies()])
        .then(([userData, moviesData]) => {
          // moviesData = массив объектов карточке с сервера

          setCurrentUser(userData);
          const formattedMovies = moviesData.map((movie) => {
            return {
              ...movie,
              isClicked: true,
            };
          });
          setIsSavedCards(formattedMovies);

          console.log(userData);
          console.log(formattedMovies);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, [loggedIn]);

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
        if (JSON.parse(localStorage.moviessetting).isToggleMoviesFilter) {
          setIsToggleMoviesFilter(
            JSON.parse(localStorage.moviessetting).isToggleMoviesFilter
          );
          setSearch(JSON.parse(localStorage.moviessetting).value);
        } else {
          setSearch(JSON.parse(localStorage.moviessetting).value);
        }
      }
    }
  }, [loggedIn, numberOfMovies]);

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

  function handleLogin({ password, email }) {
    // setIsLoading(true);
    MainApiSet.login({ email, password })
      .then((res) => {
        if (res.message) {
          setSubmitError(res.message);
          return;
        }
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setSubmitError(`На сервере произошла ошибка: ${err}`);
      })
      .finally(() => {
        //   setIsLoading(false);
      });
  }

  function handleRegister({ name, password, email }) {
    // setIsLoading(true);
    MainApiSet.register({ name, password, email })
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        if (err === "Ошибка 409") {
          setSubmitError("Пользователь с таким email уже существует");
        } else {
          setSubmitError("При регистрации пользователя произошла ошибка");
        }
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsDisableMoreButton(() => numberOfMovies > cards.length);
  }, [numberOfMovies, cards]);

  function handleAddMovies(number, cards) {
    if (deviceWidth >= 1280) {
      setNumberOfMovies(number + 4);
    } else if (1280 < deviceWidth || deviceWidth >= 990) {
      setNumberOfMovies(number + 3);
    } else {
      setNumberOfMovies(number + 2);
    }
  }

  function handleToggleBurger() {
    setIsToggleBurger(!isToggleBurger);
  }

  useEffect(() => {
    if (localStorage.movies) {
      const movies = JSON.parse(localStorage.movies);
      const shortMovies = JSON.parse(localStorage.movies).filter(
        (m) => m.duration <= 40
      );
      if (isToggleMoviesFilter) {
        setCards(shortMovies);
        localStorage.setItem(
          "moviessetting",
          JSON.stringify({
            isToggleMoviesFilter,
            value: JSON.parse(localStorage.moviessetting).value,
          })
        );
      } else {
        setCards(movies.slice(0, numberOfMovies));
        localStorage.setItem(
          "moviessetting",
          JSON.stringify({
            isToggleMoviesFilter,
            value: JSON.parse(localStorage.moviessetting).value,
          })
        );
      }
    }
  }, [isToggleMoviesFilter, numberOfMovies]);

  function handleToggleFilter() {
    setIsToggleMoviesFilter(!isToggleMoviesFilter);
  }

  function handleSelectMovie(card) {
    if (!card.isClicked) {
      MainApiSet.createMovie(card)
        .then((cardData) => {
          card.isClicked = true;
          const newCard = { ...cardData, isClicked: true };
          setIsSavedCards([...isSavedCards,  newCard]);
          const movies = JSON.parse(localStorage.movies);
          const newCards = movies.map((c) => c.movieId === newCard.movieId ? newCard : c);
          localStorage.setItem("movies", JSON.stringify(newCards));
        })
        .catch((err) => {
          console.log(`${err}`);
        })
        .finally(() => {
          // setIsLoading(false);
        });
    } else {
      MainApiSet.deleteMovie(card.movieId)
        .then((deletedMovie) => {
          card.isClicked = false;
          setIsSavedCards((movies) => movies.filter((m) => (m.movieId !== deletedMovie.movieId)));
          const newCard = { ...deletedMovie, isClicked: false };
          const movies = JSON.parse(localStorage.movies);
          const newCards = movies.map((c) => c.movieId === newCard.movieId ? newCard : c);
          localStorage.setItem("movies", JSON.stringify(newCards));
        })
        .catch((err) => {
          console.log(`${err}`);
        })
        .finally(() => {
          // setIsLoading(false);
        });
      card.isClicked = false;
    }
    setIsSavedCards((state) => state.filter((c) => c.isClicked));
    setCards((state) =>
      state.map((c) => (c.movieId === card.movieId ? card : c))
    );
  }

  function handleSavedStates() {
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

  function handleSaveToLocalStorage(movies, val) {
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem(
      "moviessetting",
      JSON.stringify({ isToggleMoviesFilter, value: val })
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
            //  Сохраняем массив фильмом в нужном формате
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
                owner: currentUser,
                nameRU,
                nameEN,
              };
            }
          );

          setInitialMovies(formattedMovies);
          const foundMovies = formattedMovies.filter((m) =>
            m.nameRU.toLowerCase().includes(value.toLowerCase())
          );
          handleSaveToLocalStorage(foundMovies, value);
          if (!foundMovies.length) {
            handleNumberOfMovies(deviceWidth);
            setCards(foundMovies.slice(0, numberOfMovies));
            setIsNotFoundMoviesText("Ничего не найдено");
            setIsNotFoundMovies(true);
            return;
          }
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

  function onEditProfileButton() {
    setIsEditProfile(true);
  }

  function handleEditProfile({ name, email }) {
    // setIsLoading(true);
    MainApiSet.updateUser({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfile(false);
      })
      .catch((err) => {
        if (err) {
          setSubmitError("При обновлении профиля произошла ошибка");
        }
        console.log(`${err}`);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

  function handleSignoutProfile() {
    MainApiSet.signout()
      .then(() => {
        setLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        if (err) {
          setSubmitError("Что-то пошло не так");
        }
        console.log(`${err}`);
      })
      .finally(() => {
        // setIsLoading(false);
      });
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
              numberOfMovies={numberOfMovies}
              cards={cards}
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
              onEditButton={onEditProfileButton}
              isEditProfile={isEditProfile}
              onEditProfile={handleEditProfile}
              values={values}
              onInputChange={handleChange}
              isValid={isValid}
              submitError={submitError}
              onSignout={handleSignoutProfile}
            />
          </Route>
          <Route path="/signin">
            <Login
              onInputChange={handleChange}
              values={values}
              errors={errors}
              isValid={isValid}
              onLogin={handleLogin}
              submitError={submitError}
            />
          </Route>
          <Route path="/signup">
            <Register
              onInputChange={handleChange}
              values={values}
              errors={errors}
              isValid={isValid}
              onRegister={handleRegister}
              submitError={submitError}
            />
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

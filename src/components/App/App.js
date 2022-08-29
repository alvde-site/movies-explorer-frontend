import { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import Main from "./Main/Main";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MainApiSet } from "../../utils/MainApi";
import { MoviesApiSet } from "../../utils/MoviesApi";
import { useFormWithValidation } from "../../utils/formValidator";
import {
  COUNTOFADDEDMOVIESFORBIGDEVICE,
  COUNTOFADDEDMOVIESFORMEDIUMDEVICE,
  COUNTOFADDEDMOVIESFORSMALLDEVICE,
  COUNTOFMOVIESFORBIGDEVICE,
  COUNTOFMOVIESFORMEDIUMDEVICE,
  COUNTOFMOVIESFORSMALLDEVICE,
  SHORTMOVIESDURATION,
  WIDTHOFBIGDEVICE,
  WIDTHOMEDIUMDEVICE,
} from "../../utils/config";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isToggleBurger, setIsToggleBurger] = useState(false);
  const [isToggleMoviesFilter, setIsToggleMoviesFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const [isSavedCards, setIsSavedCards] = useState([]); // Сохраненные фильмы текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [isEmptySearchValue, setIsEmptySearchValue] = useState(false);
  const [isEmptySavedMoviesSearchValue, setIsEmptySavedMoviesSearchValue] =
    useState(false);
  const [search, setSearch] = useState(""); //  value на странице /movies
  const [savedSearch, setSavedSearch] = useState(""); // value на странице /saved-movies
  const [isSavedMoviesToggleFilter, setIsSavedMoviesToggleFilter] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);
  const [isNotFoundSavedMovies, setIsNotFoundSavedMovies] = useState(false);
  const [notFoundMoviesText, setIsNotFoundMoviesText] = useState("");
  const [notFoundSavedMoviesText, setIsNotSavedFoundMoviesText] = useState("");
  const [numberOfMovies, setNumberOfMovies] = useState(16);
  const [deviceWidth, setDeviceWidth] = useState(1280);
  const [isDisableMoreButton, setIsDisableMoreButton] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [token, setToken] = useState("");
  const [currentInitialMovies, setCurrentInitialMovies] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isInvalidToken, setIsInvalidToken] = useState(false);

  const history = useHistory();
  const { values, handleChange, errors, isValid, setIsValid } =
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

  useEffect(() => {
    if (isInvalidToken) {
      history.push("/signin");
    }
  }, [isInvalidToken, history]);

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      // здесь будем проверять токен
      if (jwt) {
        // проверим токен
        MainApiSet.getContent(jwt)
          .then((res) => {
            if (res._id) {
              setLoggedIn(true);
              setSubmitError("");
              setIsInvalidToken(false);
            }
          })
          .catch((err) => {
            if (err === "Ошибка 401") {
              setLoggedIn(false);
              setSubmitError("Неверный логин или пароль");
              setIsInvalidToken(true);
            }
            console.log(`${err}`);
          });
      }
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        MainApiSet.getCurrentUser(token),
        MainApiSet.getMovies(token),
      ])
        .then(([userData, moviesData]) => {
          // moviesData = массив объектов карточке с сервера

          setCurrentUser(userData);

          const moviesOfCurrentUser = moviesData.filter(
            // Сохраненные фильмы текущего пользователя
            (movie) => userData._id === movie.owner
          );

          const formattedMovies = moviesOfCurrentUser.map((movie) => {
            return {
              ...movie,
              isClicked: true,
              _id: movie._id,
            };
          });

          const initialMovies = JSON.parse(
            localStorage.getItem("initialmovies")
          );
          if (initialMovies && formattedMovies.length > 0) {
            let newCurrentInitialMovies = initialMovies;

            for (let i = 0; i < formattedMovies.length; i++) {
              for (let m = 0; m < newCurrentInitialMovies.length; m++) {
                newCurrentInitialMovies = newCurrentInitialMovies.map((m) =>
                  m.isClicked
                    ? m
                    : m.movieId === formattedMovies[i].movieId
                    ? formattedMovies[i]
                    : m
                );
              }
            }

            setCurrentInitialMovies(newCurrentInitialMovies);
          } else {
            setCurrentInitialMovies(initialMovies);
          }

          localStorage.setItem("savedmovies", JSON.stringify(formattedMovies)); // Сохраненные фильмы текущего пользователя

          setIsSavedCards(formattedMovies);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, [loggedIn, token]);

  useEffect(() => {
    if (loggedIn) {
      if (JSON.parse(localStorage.getItem("movies"))) {
        setCards(
          JSON.parse(localStorage.getItem("movies")).slice(0, numberOfMovies)
        );
      } else {
        setIsDisableMoreButton(true);
      }
      if (localStorage.toggle) {
        setIsToggleMoviesFilter(JSON.parse(localStorage.toggle));
      }
      if (localStorage.value) {
        setSearch(JSON.parse(localStorage.value));
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
    if (width >= WIDTHOFBIGDEVICE) {
      setNumberOfMovies(COUNTOFMOVIESFORBIGDEVICE);
    } else if (WIDTHOFBIGDEVICE < width || width >= WIDTHOMEDIUMDEVICE) {
      setNumberOfMovies(COUNTOFMOVIESFORMEDIUMDEVICE);
    } else {
      setNumberOfMovies(COUNTOFMOVIESFORSMALLDEVICE);
    }
  }

  function handleLogin({ password, email }) {
    setIsLoading(true);
    setSubmitError("");
    MainApiSet.login({ email, password })
      .then((res) => {
        if (res.message) {
          setSubmitError(res.message);
          return;
        }
        if (res.token) {
          localStorage.setItem("token", res.token);
          setToken(res.token);
          setIsInvalidToken(false);
          return res;
        } else {
          return;
        }
      })
      .then((res) => {
        if (res.token) {
          setSubmitError("");
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err === "Ошибка 401") {
          setSubmitError("Неверный логин или пароль");
        }
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister({ name, password, email }) {
    setIsLoading(true);
    setSubmitError("");
    MainApiSet.register({ name, password, email })
      .then((res) => {
        if (res.email) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        if (err === "Ошибка 409") {
          setSubmitError("Пользователь с таким email уже существует");
        } else {
          setSubmitError("При регистрации пользователя произошла ошибка");
        }
        return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsDisableMoreButton(() => numberOfMovies > cards.length);
  }, [numberOfMovies, cards]);

  function handleAddMovies(number, cards) {
    if (deviceWidth >= WIDTHOFBIGDEVICE) {
      setNumberOfMovies(number + COUNTOFADDEDMOVIESFORBIGDEVICE);
    } else if (
      WIDTHOFBIGDEVICE < deviceWidth ||
      deviceWidth >= WIDTHOMEDIUMDEVICE
    ) {
      setNumberOfMovies(number + COUNTOFADDEDMOVIESFORMEDIUMDEVICE);
    } else {
      setNumberOfMovies(number + COUNTOFADDEDMOVIESFORSMALLDEVICE);
    }
  }

  function handleToggleBurger() {
    setIsToggleBurger(!isToggleBurger);
  }

  useEffect(() => {
    if (localStorage.movies) {
      const movies = JSON.parse(localStorage.movies);
      const shortMovies = JSON.parse(localStorage.movies).filter(
        (m) => m.duration <= SHORTMOVIESDURATION
      );
      if (isToggleMoviesFilter) {
        setCards(shortMovies);
      } else {
        setCards(movies.slice(0, numberOfMovies));
      }
    }
  }, [isToggleMoviesFilter, numberOfMovies]);

  function handleToggleFilter() {
    setIsToggleMoviesFilter(!isToggleMoviesFilter);
    localStorage.setItem("toggle", JSON.stringify(!isToggleMoviesFilter));
  }

  function filterCrashedMovies(movies) {
    const filterCrashMovies = movies.filter(
      (m) =>
        m.id &&
        m.country &&
        m.director &&
        m.duration &&
        m.year &&
        m.description &&
        m.image &&
        m.trailerLink &&
        m.nameRU &&
        m.nameEN
    );
    const filterCrashTrailerLink = filterCrashMovies.filter((m) =>
      m.trailerLink.startsWith("https")
    );
    return filterCrashTrailerLink;
  }

  useEffect(() => {
    if (localStorage.savedmovies) {
      const savedMovies = JSON.parse(localStorage.savedmovies);
      const shortSavedMovies = JSON.parse(localStorage.savedmovies).filter(
        (m) => m.duration <= SHORTMOVIESDURATION
      );
      if (isSavedMoviesToggleFilter) {
        setIsSavedCards(shortSavedMovies);
      } else {
        setIsSavedCards(savedMovies.slice(0, numberOfMovies));
      }
    }
  }, [isSavedMoviesToggleFilter, numberOfMovies]);

  function handleSavedMovieTopggleFilter() {
    setIsSavedMoviesToggleFilter(!isSavedMoviesToggleFilter);
  }

  function handleSelectMovie(card) {
    if (!card.isClicked) {
      MainApiSet.createMovie(card, token)
        .then((cardData) => {
          card.isClicked = true;
          card._id = cardData._id;
          const newCard = { ...cardData, isClicked: true, _id: cardData._id };

          // Сохраняем выбранную карточку в localStorage сохраненных карточек и отображаем
          const savedMovies = JSON.parse(localStorage.savedmovies);
          const newSavedMovies = [...savedMovies, newCard];
          localStorage.setItem("savedmovies", JSON.stringify(newSavedMovies));
          setIsSavedCards(newSavedMovies);

          setCurrentInitialMovies((movies) =>
            movies.map((c) => (c.movieId === newCard.movieId ? newCard : c))
          );

          // Сохраняем выбранную карточку в localStorage найденных карточек на странице /movies и отображаем
          const selectedMovies = JSON.parse(localStorage.movies);
          const newSelectedCards = selectedMovies.map((c) =>
            c.movieId === newCard.movieId ? newCard : c
          );
          localStorage.setItem("movies", JSON.stringify(newSelectedCards));
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    } else {
      MainApiSet.deleteMovie(card._id, token)
        .then((deletedMovie) => {
          card.isClicked = false;

          // Удаляем выбранную карточку из localStorage сохраненных карточек и отображаем
          const savedMovies = JSON.parse(localStorage.savedmovies);
          const newSavedMovies = savedMovies.filter(
            (m) => m.movieId !== deletedMovie.movieId
          );
          localStorage.setItem("savedmovies", JSON.stringify(newSavedMovies));
          setIsSavedCards(newSavedMovies);

          // Удаляем выбранную карточку из localStorage карточек по умолчанию и отображаем
          const newCard = { ...deletedMovie, isClicked: false };
          setCurrentInitialMovies((movies) =>
            movies.map((c) => (c.movieId === newCard.movieId ? newCard : c))
          );

          // Удалеяем выбранную карточку из localStorage найденных карточек на странице /movies и отображаем
          const selectedMovies = JSON.parse(localStorage.movies);
          const newSelectedCards = selectedMovies.map((c) =>
            c.movieId === newCard.movieId ? newCard : c
          );
          localStorage.setItem("movies", JSON.stringify(newSelectedCards));
        })
        .catch((err) => {
          console.log(`${err}`);
        });
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
    setIsToggleMoviesFilter(JSON.parse(localStorage.toggle));
    setSearch(JSON.parse(localStorage.value));
  }

  function handleSaveToLocalStorage(movies, val) {
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("toggle", JSON.stringify(isToggleMoviesFilter));
    localStorage.setItem("value", JSON.stringify(val));
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

    if (!localStorage.initialmovies) {
      // Проверяем - загружены ли фильмы по умолчанию
      MoviesApiSet.getInitialMovies()
        .then((movies) => {
          const isNotCrashMovies = filterCrashedMovies(movies);
          const formattedMovies = isNotCrashMovies.map(
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

          localStorage.setItem(
            "initialmovies",
            JSON.stringify(formattedMovies)
          );
          setCurrentInitialMovies(formattedMovies);
          const foundMovies = formattedMovies.filter((m) =>
            m.nameRU.toLowerCase().includes(value.toLowerCase())
          );
          handleSaveToLocalStorage(foundMovies, value);
          if (!foundMovies.length) {
            handleNumberOfMovies(deviceWidth);
            setCards(foundMovies.slice(0, numberOfMovies));
            setCurrentInitialMovies(formattedMovies);
            setIsNotFoundMoviesText("Ничего не найдено");
            setIsNotFoundMovies(true);
            return;
          }
          handleNumberOfMovies(deviceWidth);
          setCards(foundMovies.slice(0, numberOfMovies));
          setIsNotFoundMovies(false);
          setIsToggleMoviesFilter(JSON.parse(localStorage.toggle));
          setSearch(JSON.parse(localStorage.value));
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
          setIsToggleMoviesFilter(false);
        });
    } else {
      const foundMovies = currentInitialMovies.filter((m) =>
        m.nameRU.toLowerCase().includes(value.toLowerCase())
      );
      handleSaveToLocalStorage(foundMovies, value);
      let newCurrentInitialMovies;

      if (foundMovies.length > 1) {
        for (let i = 0; i < foundMovies.length; i++) {
          newCurrentInitialMovies = currentInitialMovies.map((m) =>
            m.movieId === foundMovies[i].movieId ? foundMovies[i] : m
          );
        }
        setCurrentInitialMovies(newCurrentInitialMovies);
      }

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
    setIsToggleMoviesFilter(false);
  }

  function handleSearchSavedMovie(value) {
    // Проверка на отсутствие ключевого слова в поиске фильма
    if (!value) {
      setIsEmptySavedMoviesSearchValue(true);
      return;
    } else {
      setIsEmptySavedMoviesSearchValue(false);
    }
    const initialFoundMovies = JSON.parse(localStorage.getItem("savedmovies"));
    const foundMovies = initialFoundMovies.filter((m) =>
      m.nameRU.toLowerCase().includes(value.toLowerCase())
    );

    if (!foundMovies.length) {
      setIsNotSavedFoundMoviesText("Ничего не найдено");
      setIsNotFoundSavedMovies(true);
      setIsSavedCards([]);
    } else {
      setIsNotFoundSavedMovies(false);
      setIsSavedCards(foundMovies);
    }
    setIsSavedMoviesToggleFilter(false);
  }

  function onEditProfileButton() {
    setIsEditProfile(true);
    setSubmitSuccess(false);
  }

  function handleEditProfile({ name, email }) {
    setIsLoading(true);
    MainApiSet.updateUser({ name, email }, token)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfile(false);
        setSubmitSuccess(true);
      })
      .catch((err) => {
        if (err) {
          setSubmitError("При обновлении профиля произошла ошибка");
        }
        setSubmitSuccess(false);
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignoutProfile() {
    setIsLoading(true);
    MainApiSet.signout(token)
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedmovies");
        localStorage.removeItem("toggle");
        localStorage.removeItem("value");
        setCards([]);
        setIsSavedCards([]);
        setIsNotFoundMovies(false);
        setIsNotFoundSavedMovies(false);
        setIsToggleMoviesFilter(false);
        setIsSavedMoviesToggleFilter(false);
        setSubmitSuccess(false);
        setSearch("");
        setSavedSearch("");
        history.push("/");
      })
      .catch((err) => {
        if (err) {
          setSubmitError("Что-то пошло не так");
        }
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSetSearch(value) {
    setSearch(value);
  }

  function handleSetSavedMovieSearch(value) {
    setSavedSearch(value);
  }

  function handleCloseNavigationMenu() {
    setIsToggleBurger(false);
  }

  function handleProfileSameValue(e) {
    if (
      e.target.value === currentUser.name ||
      e.target.value === currentUser.email
    ) {
      setIsValid(false);
    }
  }

  function handleReturnPage() {
    history.goBack();
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
              onCloseNav={handleCloseNavigationMenu}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
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
            onSearchValue={handleSetSearch}
            isLoading={isLoading}
            isNotFoundMovies={isNotFoundMovies}
            notFoundMoviesText={notFoundMoviesText}
            onAddMovies={handleAddMovies}
            isDisableMoreButton={isDisableMoreButton}
            numberOfMovies={numberOfMovies}
            cards={cards}
            onCloseNav={handleCloseNavigationMenu}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            onToggleBurger={handleToggleBurger}
            isToggleBurger={isToggleBurger}
            onToggleFilter={handleSavedMovieTopggleFilter}
            isToggleFilter={isSavedMoviesToggleFilter}
            onSelect={handleSelectMovie}
            cardsData={isSavedCards}
            onSearchValue={handleSetSavedMovieSearch}
            onSearch={handleSearchSavedMovie}
            searchValue={savedSearch}
            isEmptyValue={isEmptySavedMoviesSearchValue}
            isNotFoundMovies={isNotFoundSavedMovies}
            notFoundMoviesText={notFoundSavedMoviesText}
            onAddMovies={handleAddMovies}
            isDisableMoreButton={true}
            numberOfMovies={numberOfMovies}
            cards={cards}
            onCloseNav={handleCloseNavigationMenu}
            isLoading={isLoading}
          />
          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
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
            submitSuccess={submitSuccess}
            onSignout={handleSignoutProfile}
            onCloseNav={handleCloseNavigationMenu}
            onSameValue={handleProfileSameValue}
            isLoading={isLoading}
          />
          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                onInputChange={handleChange}
                values={values}
                errors={errors}
                isValid={isValid}
                onLogin={handleLogin}
                submitError={submitError}
                isLoading={isLoading}
              />
            )}
          </Route>
          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
                onInputChange={handleChange}
                values={values}
                errors={errors}
                isValid={isValid}
                onRegister={handleRegister}
                submitError={submitError}
                isLoading={isLoading}
              />
            )}
          </Route>
          <Route path="*">
            <PageNotFound onBack={handleReturnPage} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

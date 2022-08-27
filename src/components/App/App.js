import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isToggleBurger, setIsToggleBurger] = useState(false);
  const [isToggleMoviesFilter, setIsToggleMoviesFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const [isSavedCards, setIsSavedCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
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
  const [token, setToken] = useState('');
  const [currentInitialMovies, setCurrentInitialMovies] = useState([])

  const history = useHistory();
  const { values, handleChange, errors, isValid } = useFormWithValidation();

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
      setToken(jwt);
      // здесь будем проверять токен
      if (jwt) {
        // проверим токен
        MainApiSet.getContent(jwt)
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
      Promise.all([MainApiSet.getCurrentUser(token), MainApiSet.getMovies(token)])
        .then(([userData, moviesData]) => {
          // moviesData = массив объектов карточке с сервера

          setCurrentUser(userData);

          const moviesOfCurrentUser = moviesData.filter(
            (movie) => userData._id === movie.owner
          );

          const formattedMovies = moviesOfCurrentUser.map((movie) => {
            return {
              ...movie,
              isClicked: true,
            };
          });

          localStorage.setItem("savedmovies", JSON.stringify(formattedMovies));


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
    if (width >= 1280) {
      setNumberOfMovies(16);
    } else if (1280 < width || width >= 990) {
      setNumberOfMovies(12);
    } else {
      setNumberOfMovies(8);
    }
  }

  function handleLogin({ password, email }) {
    setIsLoading(true);
    MainApiSet.login({ email, password })
      .then((res) => {
        if (res.message) {
          setSubmitError(res.message);
          return;
        }
        if(res.token) {
          localStorage.setItem("token", res.token);
          setToken(res.token);
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
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister({ name, password, email }) {
    setIsLoading(true);
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
      } else {
        setCards(movies.slice(0, numberOfMovies));
      }
    }
  }, [isToggleMoviesFilter, numberOfMovies]);

  function handleToggleFilter() {
    setIsToggleMoviesFilter(!isToggleMoviesFilter);
    localStorage.setItem("toggle", JSON.stringify(!isToggleMoviesFilter));
  }

  function handleSelectMovie(card) {
    if (!card.isClicked) {
      MainApiSet.createMovie(card, token)
        .then((cardData) => {
          card.isClicked = true;
          const newCard = { ...cardData, isClicked: true };

          // Сохраняем выбранную карточку в localStorage сохраненных карточек и отображаем
          const savedMovies = JSON.parse(localStorage.savedmovies);
          const newSavedMovies = [...savedMovies, newCard];
          localStorage.setItem("savedmovies", JSON.stringify(newSavedMovies));
          setIsSavedCards(newSavedMovies);

          // Сохраняем выбранную карточку в localStorage карточек по умолчанию и отображаем
          // const movies = JSON.parse(localStorage.initialmovies);
          const newCards = currentInitialMovies.map((c) =>
            c.movieId === newCard.movieId ? newCard : c
          );
          // localStorage.setItem("initialmovies", JSON.stringify(newCards));
          setCurrentInitialMovies(newCards);


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
      MainApiSet.deleteMovie(card.movieId, token)
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
          const movies = JSON.parse(localStorage.initialmovies);
          const newCards = movies.map((c) =>
            c.movieId === newCard.movieId ? newCard : c
          );
          localStorage.setItem("initialmovies", JSON.stringify(newCards));

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
        });
    } else {
      const initialMovies = JSON.parse(localStorage.initialmovies);
      setCurrentInitialMovies(initialMovies);
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
    const initialFoundMovies = JSON.parse(localStorage.getItem("savedmovies"));
    const foundMovies = initialFoundMovies.filter((m) =>
      m.nameRU.toLowerCase().includes(value.toLowerCase())
    );

    if (!foundMovies.length) {
      setIsNotFoundMoviesText("Ничего не найдено");
      setIsNotFoundMovies(true);
    } else {
      setIsNotFoundMovies(false);
    }
    setIsSavedCards(foundMovies);
  }

  function onEditProfileButton() {
    setIsEditProfile(true);
  }

  function handleEditProfile({ name, email }) {
    MainApiSet.updateUser({ name, email }, token)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfile(false);
      })
      .catch((err) => {
        if (err) {
          setSubmitError("При обновлении профиля произошла ошибка");
        }
        console.log(`${err}`);
      });
  }

  function handleSignoutProfile() {
    MainApiSet.signout(token)
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedmovies")
        localStorage.removeItem("toggle");
        localStorage.removeItem("value");
        setCards([]);
        setIsNotFoundMovies(false);
        setIsToggleMoviesFilter(false);
        setSearch("");
        history.push("/");
      })
      .catch((err) => {
        if (err) {
          setSubmitError("Что-то пошло не так");
        }
        console.log(`${err}`);
      });
  }

  function handleSetSearch(value) {
    setSearch(value);
  }

  function handleCloseNavigationMenu() {
    setIsToggleBurger(false);
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
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            onToggleBurger={handleToggleBurger}
            isToggleBurger={isToggleBurger}
            onToggleFilter={handleToggleFilter}
            isToggleFilter={isToggleMoviesFilter}
            onSelect={handleSelectMovie}
            cardsData={isSavedCards}
            onSearchValue={handleSetSearch}
            onSearch={handleSearchSavedMovie}
            searchValue={search}
            isEmptyValue={isEmptySearchValue}
            isNotFoundMovies={isNotFoundMovies}
            notFoundMoviesText={notFoundMoviesText}
            onAddMovies={handleAddMovies}
            isDisableMoreButton={true}
            numberOfMovies={numberOfMovies}
            cards={cards}
            onCloseNav={handleCloseNavigationMenu}
          />
          <ProtectedRoute
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
            onSignout={handleSignoutProfile}
            onCloseNav={handleCloseNavigationMenu}
          />
          <Route path="/signin">
            <Login
              onInputChange={handleChange}
              values={values}
              errors={errors}
              isValid={isValid}
              onLogin={handleLogin}
              submitError={submitError}
              isLoading={isLoading}
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
              isLoading={isLoading}
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

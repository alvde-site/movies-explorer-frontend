import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies({
  loggedIn,
  onToggleBurger,
  isToggleBurger,
  onToggleFilter,
  isToggleFilter,
  cardsData,
  onSelect,
  isSelected,
  onSearch,
  isEmptyValue,
  searchValue,
  onSearchValue,
  isLoading,
  isNotFoundMovies,
  notFoundMoviesText,
  onAddMovies,
  isDisableMoreButton,
  numberOfMovies,
  cards,
  onCloseNav,
}) {
  return (
    <>
      <header>
        <Header
          loggedIn={loggedIn}
          onToggleBurger={onToggleBurger}
          isToggleBurger={isToggleBurger}
        />
      </header>
      <main className="content">
        <section className="movies" aria-label="Фильмы">
          <SearchForm
            onToggleFilter={onToggleFilter}
            isToggleFilter={isToggleFilter}
            onSearch={onSearch}
            isEmptyValue={isEmptyValue}
            searchValue={searchValue}
            onSearchValue={onSearchValue}
            isLoading={isLoading}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cardsData={cardsData}
              onSelect={onSelect}
              isSelected={isSelected}
              cardButtonClassType="card__select-button_type_active"
              isNotFoundMovies={isNotFoundMovies}
              notFoundMoviesText={notFoundMoviesText}
              onAddMovies={onAddMovies}
              isDisableMoreButton={isDisableMoreButton}
              numberOfMovies={numberOfMovies}
              cards={cards}
            />
          )}
        </section>
      </main>
      <Footer />
      <Navigation isToggleBurger={isToggleBurger} onCloseNav={onCloseNav} />
    </>
  );
}

export default Movies;

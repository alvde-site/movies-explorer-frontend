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
            />
          )}
        </section>
      </main>
      <Footer />
      <Navigation isToggleBurger={isToggleBurger} />
    </>
  );
}

export default Movies;

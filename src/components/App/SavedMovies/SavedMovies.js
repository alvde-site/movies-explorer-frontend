import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({
  loggedIn,
  onToggleBurger,
  isToggleBurger,
  onToggleFilter,
  isToggleFilter,
  cardsData,
  onSelect,
  isSelected,
  onSearchValue,
  onSearch,
  searchValue,
  isNotFoundMovies,
  notFoundMoviesText,
  onAddMovies,
  isDisableMoreButton,
  numberOfMovies,
  cards,
  onCloseNav,
  isEmptyValue,
  isLoading,
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
            onSearchValue={onSearchValue}
            onSearch={onSearch}
            searchValue={searchValue}
            isEmptyValue={isEmptyValue}
            iisLoading={isLoading}
          />
          <MoviesCardList
            cardsData={cardsData}
            onSelect={onSelect}
            isSelected={isSelected}
            cardButtonClassType="card__select-button_type_remove"
            isNotFoundMovies={isNotFoundMovies}
            notFoundMoviesText={notFoundMoviesText}
            onAddMovies={onAddMovies}
            isDisableMoreButton={isDisableMoreButton}
            numberOfMovies={numberOfMovies}
            cards={cards}
          />
        </section>
      </main>
      <Footer />
      <Navigation isToggleBurger={isToggleBurger} onCloseNav={onCloseNav} />
    </>
  );
}

export default SavedMovies;

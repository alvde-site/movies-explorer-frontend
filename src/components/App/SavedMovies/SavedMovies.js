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
  onSearch
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
          />
          <MoviesCardList
            cardsData={cardsData}
            onSelect={onSelect}
            isSelected={isSelected}
            cardButtonClassType="card__select-button_type_remove"
          />
        </section>
      </main>
      <Footer />
      <Navigation isToggleBurger={isToggleBurger} />
    </>
  );
}

export default SavedMovies;

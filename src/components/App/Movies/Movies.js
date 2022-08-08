import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

function Movies({
  loggedIn,
  onToggleBurger,
  isToggleBurger,
  onToggleFilter,
  isToggleFilter,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        onToggleBurger={onToggleBurger}
        isToggleBurger={isToggleBurger}
      />
      <main className="content">
        <section className="movies">
        <SearchForm
          onToggleFilter={onToggleFilter}
          isToggleFilter={isToggleFilter}
        />
        <MoviesCardList />
        <MoviesCard />
        </section>
      </main>
      <Footer />
      <Navigation />
      <Preloader />
    </>
  );
}

export default Movies;

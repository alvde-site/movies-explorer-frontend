import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn, onToggleBurger, isToggleBurger }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        onToggleBurger={onToggleBurger}
        isToggleBurger={isToggleBurger}
      />
      <Navigation />
      <MoviesCardList />
      <MoviesCard />
      <Footer />
    </>
  );
}

export default SavedMovies;

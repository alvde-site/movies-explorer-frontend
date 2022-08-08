import MoviesCardList from "../MoviesCardList/MoviesCardList";
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
      <Footer />
    </>
  );
}

export default SavedMovies;

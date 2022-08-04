import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

function Movies({loggedIn}) {

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Navigation />
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <MoviesCard />
      <Footer />
    </>
  );
}

export default Movies;

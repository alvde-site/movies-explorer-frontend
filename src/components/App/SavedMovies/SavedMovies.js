import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {

  return (
    <>
      <p>компонент страницы с сохранёнными карточками фильмов.</p>
      <MoviesCardList />
      <MoviesCard />
    </>
  );
}

export default SavedMovies;

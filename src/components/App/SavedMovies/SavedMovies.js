import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {

  return (
    <>
      <p>по роуту /saved-movies отображается страница «Сохранённые фильмы»;</p>
      <MoviesCardList />
      <MoviesCard />
    </>
  );
}

export default SavedMovies;

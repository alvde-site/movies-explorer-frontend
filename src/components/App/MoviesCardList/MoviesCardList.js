import MoviesCard from "../MoviesCard/MoviesCard";
import NotFoundMovies from "./NotFoundMovies/NotFoundMovies";

function MoviesCardList({
  cardsData,
  onSelect,
  isSelected,
  cardButtonClassType,
  isNotFoundMovies,
  notFoundMoviesText,
  onAddMovies
}) {
  function handleAddMovies(){
    onAddMovies();
  }

  return (
    <div className="movies-list">
      {isNotFoundMovies ? (
        <NotFoundMovies notFoundMoviesText={notFoundMoviesText}/>
      ) : (
        <>
          <ul className="movies-list__cards">
            {cardsData.map((card, index) => {
              return (
                <MoviesCard
                  card={card}
                  key={index}
                  onSelect={onSelect}
                  isSelected={isSelected}
                  cardButtonClassType={cardButtonClassType}
                />
              );
            })}
          </ul>
          <button className="movies-list__more-button" type="button" onClick={handleAddMovies}>
            Ещё
          </button>
        </>
      )}
    </div>
  );
}

export default MoviesCardList;

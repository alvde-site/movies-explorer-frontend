import MoviesCard from "../MoviesCard/MoviesCard";
import NotFoundMovies from "./NotFoundMovies/NotFoundMovies";

function MoviesCardList({
  cardsData,
  onSelect,
  isSelected,
  cardButtonClassType,
  isNotFoundMovies,
  notFoundMoviesText,
  onAddMovies,
  isDisableMoreButton,
  numberOfMovies,
  cards,
}) {
  function handleAddMovies() {
    onAddMovies(numberOfMovies, cards);
  }

  return (
    <div className="movies-list">
      {isNotFoundMovies ? (
        <NotFoundMovies notFoundMoviesText={notFoundMoviesText} />
      ) : (
        <>
          <ul className="movies-list__cards">
            {cardsData.map((card) => {
              return (
                <MoviesCard
                  card={card}
                  key={card.movieId}
                  onSelect={onSelect}
                  isSelected={isSelected}
                  cardButtonClassType={cardButtonClassType}
                />
              );
            })}
          </ul>
          <button
            className={`movies-list__more-button ${
              isDisableMoreButton ? "movies-list__more-button_disable" : ""
            }`}
            type="button"
            onClick={handleAddMovies}
          >
            Ещё
          </button>
        </>
      )}
    </div>
  );
}

export default MoviesCardList;

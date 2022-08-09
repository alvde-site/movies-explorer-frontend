import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cardsData, onSelect, isSelected }) {
  return (
    <div className="movies-list">
      <ul className="movies-list__cards">
        {cardsData.map((card, index) => {
          return (
            <MoviesCard
              card={card}
              key={index}
              onSelect={onSelect}
              isSelected={isSelected}
            />
          );
        })}
      </ul>
      <button className="movies-list__more-button">Ещё</button>
    </div>
  );
}

export default MoviesCardList;

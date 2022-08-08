import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({  cardsData, onSelect, isSelected }) {
  return (
    <ul className="movies-cards">
      {cardsData.map((card, index) => {
        return <MoviesCard card={card} key={index} onSelect={onSelect} isSelected={isSelected}/>;
      })}
    </ul>
  );
}

export default MoviesCardList;

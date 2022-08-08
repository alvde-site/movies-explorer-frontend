import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({  cardsData }) {
  return (
    <ul className="movies-cards">
      {cardsData.map((card) => {
        return <MoviesCard card={card}/>;
      })}
    </ul>
  );
}

export default MoviesCardList;

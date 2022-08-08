import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({  cardsData }) {
  return (
    <ul className="movies-cards">
      {cardsData.map((card, index) => {
        return <MoviesCard card={card} key={index}/>;
      })}
    </ul>
  );
}

export default MoviesCardList;

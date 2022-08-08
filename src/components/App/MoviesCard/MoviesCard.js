import unSelectedFilmIcon from "../../../images/svg/unselected-film.svg";
import selectedFilmIcon from "../../../images/svg/selected-film.svg";

function MoviesCard({ card, index, onSelect, isSelected }) {
  return (
    <li key={index} className="card">
      <img className="card__image" src={card.image} alt={card.nameRU} />
      <div className="card__desc">
        <div className="card__info">
          <p className="card__name">{card.nameRU}</p>
          <p className="card__duration">{`${Math.floor(card.duration / 60)}ч${
            card.duration % 60 ? (card.duration % 60) + "м" : ""
          }`}</p>
        </div>
        <button
          className="card__select"
          aria-label="Выбрать фильм"
          onClick={onSelect}
          style={
            isSelected
              ? { backgroundImage: `url(${selectedFilmIcon})` }
              : { backgroundImage: `url(${unSelectedFilmIcon})` }
          }
        ></button>
      </div>
    </li>
  );
}

export default MoviesCard;

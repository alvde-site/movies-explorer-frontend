// import { useContext } from "react";
// import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function MoviesCard({ card, index, onSelect }) {
  // const currentUser = useContext(CurrentUserContext);

  const cardDurationMovie = `${Math.floor(card.duration / 60)}ч${
    card.duration % 60 ? (card.duration % 60) + "м" : ""
  }`;
  // const isSelected = card.selects.some((i) => i._id === currentUser._id);

  const cardSelectButtonClassName = `card__select-button ${
    // isSelected && "card__select-button_active"
    card.isClicked && "card__select-button_active"
  }`;

  function handleSelectClick() {
    onSelect(card);
  }

  return (
    <li key={index} className="card">
      <img className="card__image" src={card.image} alt={card.nameRU} />
      <div className="card__desc">
        <div className="card__info">
          <p className="card__name">{card.nameRU}</p>
          <p className="card__duration">{cardDurationMovie}</p>
        </div>
        <button
          className={cardSelectButtonClassName}
          aria-label="Выбрать фильм"
          onClick={handleSelectClick}
        ></button>
      </div>
    </li>
  );
}

export default MoviesCard;

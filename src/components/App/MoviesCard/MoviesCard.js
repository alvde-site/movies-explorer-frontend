function MoviesCard({ card, index, onSelect, cardButtonClassType }) {
  const cardDurationMovie = `${Math.floor(card.duration / 60)}ч${
    card.duration % 60 ? (card.duration % 60) + "м" : ""
  }`;

  const cardSelectButtonClassName = `card__select-button ${
    card.isClicked && cardButtonClassType
  }`;

  function handleSelectClick() {
    onSelect(card);
  }

  return (
    <li key={index} className="card">
      <a
        href={card.trailerLink}
        className="card__trailer-link"
        rel="noreferrer"
        target="_blank"
      >
        <img className="card__image" src={card.image} alt={card.nameRU} />
      </a>
      <div className="card__desc">
        <div className="card__info">
          <p className="card__name">{card.nameRU}</p>
          <p className="card__duration">{cardDurationMovie}</p>
        </div>
        <button
          className={cardSelectButtonClassName}
          aria-label="Выбрать фильм"
          onClick={handleSelectClick}
          type="button"
        ></button>
      </div>
    </li>
  );
}

export default MoviesCard;

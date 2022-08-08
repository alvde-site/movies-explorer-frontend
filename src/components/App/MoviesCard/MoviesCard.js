function MoviesCard({card, index}) {

  return (
    <li key={index} className="card">
    {`${card}`}
    </li>
  );
}

export default MoviesCard;

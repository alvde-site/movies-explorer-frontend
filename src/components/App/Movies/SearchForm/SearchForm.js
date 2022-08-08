function SearchForm({ onSubmit }) {
  return (
    <form action="#" name="form" className="form" onSubmit={onSubmit}>
      <label htmlFor="searchmovie" className="form__field">
        <input
          id="searchmovie"
          type="text"
          className="form__input"
          name="search"
          placeholder="Фильм"
          required
        />
        <span id="error-searchmovie" className="form__input-error"></span>
        <button className="form__submit" type="submit"></button>
      </label>
    </form>
  );
}

export default SearchForm;

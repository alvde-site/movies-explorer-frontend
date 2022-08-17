import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({
  onSearch,
  onToggleFilter,
  isToggleFilter,
  isEmptyValue,
  searchValue,
  onSearchValue,
  onToggleMovies,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchValue);
  }

  function handleSearchChange(e) {
    onSearchValue(e.target.value);
  }

  return (
    <form action="#" name="form" className="form" onSubmit={handleSubmit}>
      <label htmlFor="searchmovie" className="form__field">
        <input
          id="searchmovie"
          type="text"
          className="form__input"
          name="search"
          placeholder="Фильм"
          value={searchValue || ""}
          onChange={handleSearchChange}
        />
        <span className="form__input_focus"></span>
        <span
          id="error-searchmovie"
          className={`form__input-error ${
            isEmptyValue ? "form__input-error_active" : ""
          }`}
        >
          Нужно ввести ключевое слово
        </span>
        <button className="form__submit" type="submit"></button>
      </label>
      <FilterCheckbox
        onToggleFilter={onToggleFilter}
        isToggleFilter={isToggleFilter}
        onToggleMovies={onToggleMovies}
      />
    </form>
  );
}

export default SearchForm;

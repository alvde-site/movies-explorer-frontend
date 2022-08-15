import { useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearch, onToggleFilter, isToggleFilter }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(search);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
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
          required
          value={search || ""}
          onChange={handleSearchChange}
        />
        <span className="form__input_focus"></span>
        <span id="error-searchmovie" className="form__input-error">
          Нужно ввести ключевое слово
        </span>
        <button className="form__submit" type="submit"></button>
      </label>
      <FilterCheckbox
        onToggleFilter={onToggleFilter}
        isToggleFilter={isToggleFilter}
      />
    </form>
  );
}

export default SearchForm;

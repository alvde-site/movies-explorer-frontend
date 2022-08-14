import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({ onSubmit, onToggleFilter, isToggleFilter }) {
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
        <span className="form__input_focus"></span>
        <span id="error-searchmovie" className="form__input-error">Нужно ввести ключевое слово</span>
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

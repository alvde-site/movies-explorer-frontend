import shortFilmsDisableIcon from "../../../../../images/svg/shortfilmstumb-disable.svg";
import shortFilmsActiveIcon from "../../../../../images/svg/shortfilmstumb-active.svg";

function FilterCheckbox({ isToggleFilter, onToggleFilter }) {
  return (
    <label htmlFor="filtermovies" className="form__filter-field">
      <input
        id="filtermovies"
        type="checkbox"
        className="form__filter"
        name="filter"
      />
      <span
        className="form__filter-item"
        onClick={onToggleFilter}
        style={
          isToggleFilter
            ? { backgroundImage: `url(${shortFilmsActiveIcon})` }
            : { backgroundColor: `url(${shortFilmsDisableIcon})` }
        }
      ></span>
      <p className="form__filter-desc">Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;

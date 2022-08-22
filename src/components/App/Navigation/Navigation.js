import { Link, NavLink } from "react-router-dom";

function Navigation({ isToggleBurger, onCloseNav }) {
  function handleCloseNav() {
    onCloseNav();
  }
  return (
    <section
      className={`navigation  ${isToggleBurger ? "navigation_opened" : ""}`}
    >
      <ul className="navigation__links">
        <li>
          <NavLink
            exact
            to="/"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={handleCloseNav}
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={handleCloseNav}
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className="navigation__link navigation__link_last"
            activeClassName="navigation__link_active"
            onClick={handleCloseNav}
          >
            Сохраненные фильмы
          </NavLink>
        </li>
        <li className="navigation__account-link">
          <Link to="/profile" className="navigation__account" onClick={handleCloseNav}>
            <span>Аккаунт</span>
            <span className="navigation__account-icon"></span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Navigation;

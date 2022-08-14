import { Link, NavLink } from "react-router-dom";

function NavLinks({ onToggleBurger, isToggleBurger }) {
  function handleBurger() {
    onToggleBurger();
  }

  return (
    <>
      <ul className="header__nav-links header__nav-links_hidden_onsmall">
        <li>
          <NavLink
            to="/movies"
            className="header__link"
            activeClassName="header__link_active"
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className="header__link"
            activeClassName="header__link_active"
          >
            Сохраненные фильмы
          </NavLink>
        </li>
        <li>
          <Link to="/profile" className="header__account">
            <span>Аккаунт</span>
            <span className="header__account-icon"></span>
          </Link>
        </li>
      </ul>
      <div
        className={`burger-menu ${
          isToggleBurger ? "burger-menu_opened" : ""
        } header__burger`}
        onClick={handleBurger}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}

export default NavLinks;

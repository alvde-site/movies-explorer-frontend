import { Link } from "react-router-dom";

function NavLinks({onToggleBurger, isToggleBurger}) {
  function handleBurger() {
    onToggleBurger();
  }

  return (
    <>
    <ul className="header__nav-links header__nav-links_hidden_onsmall">
      <li>
        <Link to="/movies" className="header__link">Фильмы</Link>
      </li>
      <li>
        <Link to="/saved-movies" className="header__link">Сохраненные фильмы</Link>
      </li>
      <li>
        <Link to="/" className="header__account"><span>Аккаунт</span><span className="header__account-icon"></span></Link>
      </li>
    </ul>
    <div className={`burger-menu ${isToggleBurger ? "open" : ""} header__burger`} onClick={handleBurger}>
              <span></span>
              <span></span>
              <span></span>
            </div>
    </>
  );
}

export default NavLinks;

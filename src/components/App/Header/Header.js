import { Link } from "react-router-dom";

function Header(/*props*/) {
  // function signOut() {
  //   props.onSignOut();
  // }

  // function toggleMenu() {
  //   props.onToggleMenu();
  // }

  return (
    // <>
    //   <NavBar
    //     signOut={signOut}
    //     email={props.email}
    //     login={props.login}
    //     isToggleMenu={props.isToggleMenu}
    //     to={props.to}
    //   />
    <header className="header">
      <div className="header__logo"></div>
      <ul className="header__auth">
        <li><Link className="header__signup">Регистрация</Link></li>
        <li><Link className="header__signin">Войти</Link></li>
      </ul>
      {/* <div
          className={
            props.loggedIn
              ? "header__signin header__signin_hidden_onsmall"
              : "header__signin"
          }
        >
          {props.loggedIn && (
            <p className="header__user-email">{props.email}</p>
          )}
          {props.loggedIn ? (
            <Link
              to={props.to}
              className="header__login-link"
              onClick={signOut}
            >
              {props.login}
            </Link>
          ) : (
            <Link to={props.to} className="header__login-link">
              {props.login}
            </Link>
          )}
        </div>
        <button
          className={
            props.loggedIn
              ? "header__menu header__menu_visible_onsmall"
              : "header__menu"
          }
          onClick={toggleMenu}
          style={
            props.isToggleMenu
              ? { backgroundImage: `url(${closeIcon})` }
              : { backgroundColor: "" }
          }
        ></button> */}
    </header>
    ///  </>
  );
}

export default Header;

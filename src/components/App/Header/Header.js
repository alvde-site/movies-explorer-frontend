import AuthLinks from "./AuthLinks/AuthLinks";
import NavLinks from "./NavLinks/NavLinks";

function Header({loggedIn}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn ? <NavLinks /> : <AuthLinks />}
    </header>
  );
}

export default Header;

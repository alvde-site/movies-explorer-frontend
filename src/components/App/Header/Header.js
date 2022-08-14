import { Link } from "react-router-dom";
import AuthLinks from "./AuthLinks/AuthLinks";
import NavLinks from "./NavLinks/NavLinks";

function Header({ loggedIn, onToggleBurger, isToggleBurger }) {
  return (
    <section className="header">
      <Link to="/" className="header__logo"></Link>
      {loggedIn ? (
        <NavLinks
          onToggleBurger={onToggleBurger}
          isToggleBurger={isToggleBurger}
        />
      ) : (
        <AuthLinks />
      )}
    </section>
  );
}

export default Header;

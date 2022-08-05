import AuthLinks from "./AuthLinks/AuthLinks";
import NavLinks from "./NavLinks/NavLinks";

function Header({ loggedIn,  onToggleBurger, isToggleBurger }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn ? (
        <NavLinks
          onToggleBurger={onToggleBurger}
          isToggleBurger={isToggleBurger}
        />
      ) : (
        <AuthLinks/>
      )}
    </header>
  );
}

export default Header;

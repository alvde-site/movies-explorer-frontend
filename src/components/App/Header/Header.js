import AuthLInks from "./AuthLinks/AuthLinks";

function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <AuthLInks />
    </header>
  );
}

export default Header;

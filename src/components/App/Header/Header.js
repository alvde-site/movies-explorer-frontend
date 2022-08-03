function Header({headerLinks}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {headerLinks}
    </header>
  );
}

export default Header;

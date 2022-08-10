import { Link } from "react-router-dom";

function AuthLInks() {
  return (
    <ul className="header__links">
      <li>
        <Link to="/signup" className="header__signup">
          Регистрация
        </Link>
      </li>
      <li>
        <Link to="/signin" className="header__signin">
          Войти
        </Link>
      </li>
    </ul>
  );
}

export default AuthLInks;

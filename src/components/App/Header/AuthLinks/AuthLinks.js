import { Link } from "react-router-dom";

function AuthLInks() {
  return (
    <ul className="header__auth">
      <li>
        <Link className="header__signup">Регистрация</Link>
      </li>
      <li>
        <Link className="header__signin">Войти</Link>
      </li>
    </ul>
  );
}

export default AuthLInks;

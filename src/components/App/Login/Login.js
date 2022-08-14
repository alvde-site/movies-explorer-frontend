import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="authorization">
      <Link to="/" className="authorization__logo"></Link>
      <form
        action="#"
        name="authform"
        className="auth-form auth-form_handle_auth"
        onSubmit={handleSubmit}
      >
        <h2 className="auth-form__title">Рады видеть!</h2>
        <fieldset className="auth-form__field">
          <label htmlFor="registeremail" className="auth-form__label">
            E-mail
          </label>
          <input
            id="registeremail"
            type="email"
            className="auth-form__input auth-form__input_register_email"
            name="registeremail"
            required
            minLength="2"
            maxLength="30"
            value={email || ""}
            onChange={handleEmailChange}
          />
          <span
            id="error-registeremail"
            className="auth-form__input-error"
          ></span>
        </fieldset>
        <fieldset className="auth-form__field">
          <label htmlFor="registerpassword" className="auth-form__label">
            Пароль
          </label>
          <input
            id="registerpassword"
            type="password"
            className="auth-form__input auth-form__input_type_error auth-form__input_register_password"
            name="link"
            required
            value={password || ""}
            onChange={handlePasswordChange}
          />
          <span id="error-registerpassword" className="auth-form__input-error">
            Что-то пошло не так...
          </span>
        </fieldset>
        <button className="auth-form__submit" type="submit">
          Войти
        </button>
        <div className="auth-form__signin">
          <div className="auth-form__redirect">
            <p className="auth-form__question">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="auth-form__login-link">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

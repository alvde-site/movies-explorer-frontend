import { Link } from "react-router-dom";

function Register({onInputChange, values, errors}) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleInputChange(e) {
    onInputChange(e);
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
        <h2 className="auth-form__title">Добро пожаловать!</h2>
        <fieldset className="auth-form__field">
          <label htmlFor="registername" className="auth-form__label">
            Имя
          </label>
          <input
            id="registerename"
            type="text"
            className="auth-form__input auth-form__input_register_name"
            name="registername"
            required
            minLength="2"
            maxLength="30"
            value={values["registername"] || ""}
            onChange={handleInputChange}
          />
          <span
            id="error-registername"
            className="auth-form__input-error"
          >{errors["registername"] || ""}</span>
        </fieldset>
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
            value={values["registeremail"] || ""}
            onChange={handleInputChange}
          />
          <span
            id="error-registeremail"
            className="auth-form__input-error"
          >{errors["registeremail"] || ""}</span>
        </fieldset>
        <fieldset className="auth-form__field">
          <label htmlFor="registerpassword" className="auth-form__label">
            Пароль
          </label>
          <input
            id="registerpassword"
            type="password"
            className="auth-form__input auth-form__input_type_error auth-form__input_register_password"
            name="registerpassword"
            required
            minLength="2"
            maxLength="30"
            value={values["registerpassword"] || ""}
            onChange={handleInputChange}
          />
          <span id="error-registerpassword" className="auth-form__input-error">
          {errors["registerpassword"] || ""}
          </span>
        </fieldset>
        <button className="auth-form__submit" type="submit">
          Зарегистрироваться
        </button>
        <div className="auth-form__signin">
          <div className="auth-form__redirect">
            <p className="auth-form__question">Уже зарегистрированы?</p>
            <Link to="/signin" className="auth-form__login-link">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;

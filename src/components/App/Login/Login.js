import { Link } from "react-router-dom";

function Login({
  onInputChange,
  values,
  errors,
  isValid,
  onLogin,
  submitError,
  isLoading,
  isSubmiting,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: values["loginemail"],
      password: values["loginpassword"],
    });
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
        noValidate
      >
        <h2 className="auth-form__title">Рады видеть!</h2>
        <fieldset className="auth-form__field">
          <label htmlFor="loginemail" className="auth-form__label">
            E-mail
          </label>
          <input
            id="loginemail"
            type="email"
            className={`auth-form__input ${
              errors["loginemail"] && "auth-form__input_type_error"
            } auth-form__input_register_email`}
            name="loginemail"
            required
            minLength="2"
            maxLength="30"
            value={values["loginemail"] || ""}
            onChange={handleInputChange}
            pattern="[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}"
            formNoValidate
            disabled={isLoading}
          />
          <span id="error-loginemail" className="auth-form__input-error">
            {errors["registeremail"] || ""}
          </span>
        </fieldset>
        <fieldset className="auth-form__field">
          <label htmlFor="loginpassword" className="auth-form__label">
            Пароль
          </label>
          <input
            id="loginpassword"
            type="password"
            className={`auth-form__input ${
              errors["loginpassword"] && "auth-form__input_type_error"
            } auth-form__input_register_password`}
            name="loginpassword"
            required
            minLength="2"
            maxLength="30"
            value={values["loginpassword"] || ""}
            onChange={handleInputChange}
            formNoValidate
            disabled={isLoading}
          />
          <span id="error-loginpassword" className="auth-form__input-error">
            {errors["loginpassword"] || ""}
          </span>
        </fieldset>

        <fieldset className="auth-form__submit-fieldset">
          <span
            id="error-submitregister"
            className={`auth-form__submit-error ${
              submitError && "auth-form__submit-error_active"
            }`}
          >
            {submitError}
          </span>

          <button
            className={`auth-form__submit ${
              !isValid && "auth-form__submit_disable"
            }`}
            type="submit"
            disabled={!isValid ? true : isLoading ? true : false}
          >
            {!isLoading ? "Войти" : "Войти..."}
          </button>
          <div className="auth-form__signin">
            <div className="auth-form__redirect">
              <p className="auth-form__question">Ещё не зарегистрированы?</p>
              <Link to="/signup" className="auth-form__login-link">
                Регистрация
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;

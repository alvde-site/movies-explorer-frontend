import { Link } from "react-router-dom";

function Register({
  onInputChange,
  values,
  errors,
  isValid,
  onRegister,
  submitError,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: values["registername"],
      email: values["registeremail"],
      password: values["registerpassword"],
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
        <h2 className="auth-form__title">Добро пожаловать!</h2>
        <fieldset className="auth-form__field">
          <label htmlFor="registername" className="auth-form__label">
            Имя
          </label>
          <input
            id="registerename"
            type="text"
            className={`auth-form__input ${
              errors["registername"] && "auth-form__input_type_error"
            } auth-form__input_register_name`}
            name="registername"
            required
            minLength="2"
            maxLength="30"
            value={values["registername"] || ""}
            onChange={handleInputChange}
            formNoValidate
            disabled={isLoading}
          />
          <span id="error-registername" className="auth-form__input-error">
            {errors["registername"] || ""}
          </span>
        </fieldset>
        <fieldset className="auth-form__field">
          <label htmlFor="registeremail" className="auth-form__label">
            E-mail
          </label>
          <input
            id="registeremail"
            type="email"
            className={`auth-form__input ${
              errors["registeremail"] && "auth-form__input_type_error"
            } auth-form__input_register_email`}
            name="registeremail"
            required
            minLength="2"
            maxLength="30"
            value={values["registeremail"] || ""}
            onChange={handleInputChange}
            pattern="[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}"
            formNoValidate
            disabled={isLoading}
          />
          <span id="error-registeremail" className="auth-form__input-error">
            {errors["registeremail"] || ""}
          </span>
        </fieldset>
        <fieldset className="auth-form__field">
          <label htmlFor="registerpassword" className="auth-form__label">
            Пароль
          </label>
          <input
            id="registerpassword"
            type="password"
            className={`auth-form__input ${
              errors["registerpassword"] && "auth-form__input_type_error"
            } auth-form__input_register_password`}
            name="registerpassword"
            required
            minLength="2"
            maxLength="30"
            value={values["registerpassword"] || ""}
            onChange={handleInputChange}
            formNoValidate
            disabled={isLoading}
          />
          <span id="error-registerpassword" className="auth-form__input-error">
            {errors["registerpassword"] || ""}
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
            disabled={!isValid ? true : (isLoading ? true : false)}
          >
            {!isLoading ? "Зарегистрироваться" : "Регистрация..."}
          </button>
          <div className="auth-form__signin">
            <div className="auth-form__redirect">
              <p className="auth-form__question">Уже зарегистрированы?</p>
              <Link to="/signin" className="auth-form__login-link">
                Войти
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;

import { useContext } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import Navigation from "../Navigation/Navigation";

function Profile({
  loggedIn,
  onToggleBurger,
  isToggleBurger,
  onEditButton,
  isEditProfile,
  onEditProfile,
  values,
  onInputChange,
  isValid,
  submitError,
  submitSuccess,
  onSignout,
  onCloseNav,
}) {
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    let name = `${values["profilename"] || currentUser.name}`;
    let email = `${values["profileemail"] || currentUser.email}`;
    onEditProfile({
      name,
      email,
    });
  }

  function handleInputChange(e) {
    onInputChange(e);
  }

  function handleEditButton() {
    onEditButton();
  }

  function handleSignout() {
    onSignout();
  }

  return (
    <>
      <header>
        <Header
          loggedIn={loggedIn}
          onToggleBurger={onToggleBurger}
          isToggleBurger={isToggleBurger}
        />
      </header>

      <form
        action="#"
        name="profileform"
        className="profileform"
        onSubmit={handleSubmit}
      >
        <h2 className="profileform__title">{`Привет, ${currentUser.name}!`}</h2>
        <fieldset className="profileform__fieldset profileform__fieldset_type_name">
          <label htmlFor="profilename" className="profileform__field">
            Имя
          </label>
          <input
            id="profilename"
            type="text"
            className="profileform__input"
            name="profilename"
            required
            minLength="2"
            maxLength="30"
            value={values["profilename"] || currentUser.name || ""}
            onChange={handleInputChange}
            readOnly={!isEditProfile}
            disabled={!isEditProfile}
          />
          <span className="profileform__input_focus"></span>
        </fieldset>
        <fieldset className="profileform__fieldset">
          <label htmlFor="profileemail" className="profileform__field">
            E-mail
          </label>
          <input
            id="profileemail"
            type="email"
            className="profileform__input"
            name="profileemail"
            required
            minLength="2"
            maxLength="30"
            value={values["profileemail"] || currentUser.email || ""}
            onChange={handleInputChange}
            readOnly={!isEditProfile}
            disabled={!isEditProfile}
            pattern="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
          />
          <span className="profileform__input_focus"></span>
        </fieldset>
        <fieldset className="profileform__submit-fieldset">
          <span
            id="success-submitprofile"
            className={`profileform__submit-success ${
              submitSuccess && "profileform__submit-success_active"
            }`}
          >
            Успешно!
          </span>
          <span
            id="error-submitprofile"
            className={`profileform__submit-error ${
              submitError && "profileform__submit-error_active"
            }`}
          >
            {submitError}
          </span>
          <button
            className={`profileform__submit ${
              isEditProfile &&
              `profileform__submit_active ${
                !isValid && "profileform__submit_disable"
              }`
            }`}
            type="submit"
          >
            Сохранить
          </button>
          <button
            className={`profileform__edit ${
              isEditProfile && "profileform__edit_disabled"
            }`}
            type="button"
            onClick={handleEditButton}
          >
            Редактировать
          </button>
          <button
            className={`profileform__logout ${
              isEditProfile && "profileform__logout_disabled"
            }`}
            onClick={handleSignout}
            type="button"
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
      <Navigation isToggleBurger={isToggleBurger} onCloseNav={onCloseNav} />
    </>
  );
}

export default Profile;

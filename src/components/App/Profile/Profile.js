import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Profile({
  loggedIn,
  onToggleBurger,
  isToggleBurger,
  onEditButton,
  isEditProfile,
  onEditProfile,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser, loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({
      // name: values["registername"],
      // email: values["registeremail"],
      name, email
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleEditButton() {
    onEditButton();
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
          <label htmlFor="nameprofileform" className="profileform__field">
            Имя
          </label>
          <input
            id="nameprofileform"
            type="text"
            className="profileform__input"
            name="name"
            value={name || ""}
            onChange={handleNameChange}
            readOnly={!isEditProfile}
            disabled={!isEditProfile}
          />
          <span className="profileform__input_focus"></span>
        </fieldset>
        <fieldset className="profileform__fieldset">
          <label htmlFor="emailprofileform" className="profileform__field">
            E-mail
          </label>
          <input
            id="emailprofileform"
            type="email"
            className="profileform__input"
            name="email"
            value={email || ""}
            onChange={handleEmailChange}
            readOnly={!isEditProfile}
            disabled={!isEditProfile}
          />
          <span className="profileform__input_focus"></span>
        </fieldset>
        <fieldset className="profileform__submit-fieldset">
          <span id="error-submitprofile" className="profileform__submit-error">
            При обновлении профиля произошла ошибка.
          </span>
          <button
            className={`profileform__submit ${
              isEditProfile && "profileform__submit_active"
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
          <Link
            to="/"
            className={`profileform__logout ${
              isEditProfile && "profileform__logout_disabled"
            }`}
          >
            Выйти из аккаунта
          </Link>
        </fieldset>
      </form>
    </>
  );
}

export default Profile;

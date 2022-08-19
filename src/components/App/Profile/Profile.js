import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Profile({ loggedIn, onToggleBurger, isToggleBurger, onSubmit }) {
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

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setName(e.target.value);
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
        onSubmit={onSubmit}
      >
        <h2 className="profileform__title">{`Привет, ${name}!`}</h2>
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
            readOnly
          />
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
            readOnly
          />
        </fieldset>
        <fieldset className="profileform__submit-fieldset">
          <span id="error-submitprofile" className="profileform__submit-error">
            При обновлении профиля произошла ошибка.
          </span>
          <button className="profileform__submit" type="submit">
            Сохранить
          </button>
          <button className="profileform__edit" type="button">
            Редактировать
          </button>
          <Link to="/" className="profileform__logout">
            Выйти из аккаунта
          </Link>
        </fieldset>
      </form>
    </>
  );
}

export default Profile;

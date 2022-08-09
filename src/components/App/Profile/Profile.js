import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Profile({ loggedIn, onToggleBurger, isToggleBurger, onSubmit }) {
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@yandex.ru");
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
      <Header
        loggedIn={loggedIn}
        onToggleBurger={onToggleBurger}
        isToggleBurger={isToggleBurger}
      />
      <form action="#" name="profileform" className="profileform" onSubmit={onSubmit}>
      <h2 className="profileform__title">{`Привет, ${name}!`}</h2>
      <label htmlFor="nameprofileform" className="profileform__field">Имя</label>
        <input
          id="nameprofileform"
          type="text"
          className="profileform__input"
          name="name"
          value={name || "Виталий"}
          onChange={handleNameChange}
          readOnly
        />
        <span id="error-nameprofile" className="profileform__input-error"></span>
        <label htmlFor="emailprofileform" className="profileform__field">E-mail</label>
        <input
          id="emailprofileform"
          type="email"
          className="profileform__input"
          name="email"
          value={email || "pochta@yandex.ru"}
          onChange={handleEmailChange}
          readOnly
        />
        <span id="error-emailprofile" className="profileform__input-error"></span>
        <span id="error-submitprofile" className="profileform__submit-error">При обновлении профиля произошла ошибка.</span>
        <button className="profileform__submit" type="submit">Сохранить</button>
        <button className="profileform__edit" type="submit">Редактировать</button>
        <Link to="/" className="profileform__exit" type="submit">Выйти из аккаунта</Link>
    </form>
    </>
  );
}

export default Profile;

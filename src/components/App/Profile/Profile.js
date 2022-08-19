import { useContext } from "react";
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
  values,
  onInputChange,
}) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  // useEffect(() => {
  //   setName(currentUser.name);
  //   setEmail(currentUser.email);
  // }, [currentUser, loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({
      name: values["profilename"],
      email: values["profileemail"],
    });
  }

  function handleInputChange(e) {
    onInputChange(e);
  }

  // function handleNameChange(e) {
  //   setName(e.target.value);
  // }

  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }

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

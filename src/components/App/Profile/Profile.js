import Header from "../Header/Header";

function Profile({ loggedIn, onToggleBurger, isToggleBurger, onSubmit }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        onToggleBurger={onToggleBurger}
        isToggleBurger={isToggleBurger}
      />
      <form action="#" name="profileform" className="profileform" onSubmit={onSubmit}>
      <label htmlFor="nameprofileform" className="profileform__field">Имя</label>
        <input
          id="nameprofileform"
          type="text"
          className="profileform__input"
          name="name"
          value="Виталий"
        />
        <span id="error-nameprofile" className="profileform__input-error"></span>
        <label htmlFor="emailprofileform" className="profileform__field">E-mail</label>
        <input
          id="emailprofileform"
          type="email"
          className="profileform__input"
          name="email"
          value="pochta@yandex.ru"
        />
        <span id="error-emailprofile" className="profileform__input-error"></span>
        <button className="profileform__submit" type="submit"></button>
    </form>
    </>
  );
}

export default Profile;

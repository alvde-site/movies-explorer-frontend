import Header from "../../Header/Header";
import webland from "../../../../images/web-land.png";

function Promo({ loggedIn, isToggleBurger, onToggleBurger }) {
  return (
    <header className="promo" aria-label="Промо-блок">
      <Header
        loggedIn={loggedIn}
        onToggleBurger={onToggleBurger}
        isToggleBurger={isToggleBurger}
      />
      <div className="promo__container">
        <div className="promo__contain">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="/#about-project" className="promo__more">
            Узнать больше
          </a>
        </div>
        <img className="promo__image" src={webland} alt="Вэб-страна" />
      </div>
    </header>
  );
}

export default Promo;

import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import webland from "../../../../images/web-land.png";

function Promo({loggedIn}) {

  return (
    <section className="promo">
      <Header loggedIn={loggedIn}/>
      <div className="promo__container">
        <div className="promo__contain">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <Link className="promo__more">Узнать больше</Link>
        </div>
        <img className="promo__image" src={webland} alt="web-land"/>
      </div>
    </section>
  );
}

export default Promo;

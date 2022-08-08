import { Link } from "react-router-dom";
import me from "../../../../images/me-foto.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__description">
          <h3 className="about-me__name-title">Александр</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 39 лет</p>
          <p className="about-me__text">
            Я живу в Москве, закончил СПбГК. У меня есть жена и двое детей. Я
            люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            Прошёл курс по веб-разработке в Яндекс Практикум в 2022г.
          </p>
          <ul className="about-me__social">
            <li>
              <Link to="#" className="about-me__social-link">Facebook</Link>
            </li>
            <li>
              <Link to="#" className="about-me__social-link about-me__social-link_last">Github</Link>
            </li>
          </ul>
        </div>
        <img className="about-me__image" src={me} alt="Моя фотография" />
      </div>
    </section>
  );
}

export default AboutMe;

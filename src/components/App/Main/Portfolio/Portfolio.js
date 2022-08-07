import { Link } from "react-router-dom";

function Portfolio() {

  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__items">
        <li><Link  className="portfolio__item">Статичный сайт</Link></li>
        <li><Link  className="portfolio__item">Адаптивный сайт</Link></li>
        <li><Link  className="portfolio__item portfolio__item_last">Одностраничное приложение</Link></li>
      </ul>
    </section>
  );
}

export default Portfolio;

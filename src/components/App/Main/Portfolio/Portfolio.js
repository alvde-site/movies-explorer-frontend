function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__items">
        <li>
          <a
            href="https://github.com/alvde-site/how-to-learn"
            rel="noreferrer"
            target="_blank"
            className="portfolio__item"
          >
            Статичный сайт
          </a>
        </li>
        <li>
          <a
            href="https://github.com/alvde-site/russian-travel"
            rel="noreferrer"
            target="_blank"
            className="portfolio__item"
          >
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a
            href="https://github.com/alvde-site/react-mesto-api-full"
            rel="noreferrer"
            target="_blank"
            className="portfolio__item portfolio__item_last"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

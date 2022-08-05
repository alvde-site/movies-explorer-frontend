function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__description">
        <li>
          <h3 className="about__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__description-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about__duration">
        <li className="about__duration-item about__duration-item_theme_blue">1 неделя</li>
        <li className="about__duration-item about__duration-item_theme_grey">4 недели</li>
        <li className="about__duration-item about__duration-item_theme_white">Back-end</li>
        <li className="about__duration-item about__duration-item_theme_white">Front-end</li>
      </ul>
    </section>
  );
}

export default AboutProject;

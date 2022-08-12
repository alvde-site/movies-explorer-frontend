function AboutProject() {
  return (
    <section className="about-project" id={"about-project"}>
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__description">
        <li>
          <h3 className="about-project__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about-project__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__duration">
        <li className="about-project__duration-item about-project__duration-item_theme_blue">
          1 неделя
        </li>
        <li className="about-project__duration-item about-project__duration-item_theme_grey">
          4 недели
        </li>
        <li
          className="about-project__duration-item about-project__duration-item_theme_white"
          lang="en"
        >
          Back-end
        </li>
        <li
          className="about-project__duration-item about-project__duration-item_theme_white"
          lang="en"
        >
          Front-end
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;

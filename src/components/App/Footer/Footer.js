function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__lower-column">
        <p className="footer__copyright">© 2022</p>
        <ul className="footer__social">
          <li>
            <a
              href="https://practicum.yandex.ru/"
              rel="noreferrer"
              target="_blank"
              className="footer__social-link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/alvde-site"
              rel="noreferrer"
              target="_blank"
              className="footer__social-link"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://vk.com/sashatro"
              rel="noreferrer"
              target="_blank"
              className="footer__social-link footer__social-link_last"
            >
              ВКонтакте
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__lower-column">
        <p className="footer__copyright">© 2022</p>
        <ul className="footer__social">
          <li><Link to="#" className="footer__social-link">Яндекс.Практикум</Link></li>
          <li><Link  to="#" className="footer__social-link">Github</Link></li>
          <li><Link  to="#" className="footer__social-link footer__social-link_last">Facebook</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

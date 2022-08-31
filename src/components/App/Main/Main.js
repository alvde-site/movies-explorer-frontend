import Navigation from "../Navigation/Navigation";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "../Main/Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main({ loggedIn, onToggleBurger, isToggleBurger, onCloseNav }) {
  return (
    <>
      <Promo
        loggedIn={loggedIn}
        onToggleBurger={onToggleBurger}
        isToggleBurger={isToggleBurger}
      />
      <main className="content">
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
      <Navigation isToggleBurger={isToggleBurger} onCloseNav={onCloseNav} />
    </>
  );
}

export default Main;

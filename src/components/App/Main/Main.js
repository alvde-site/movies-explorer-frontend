import Navigation from "../Navigation/Navigation";
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main({loggedIn}) {

  return (
    <>
      <Navigation />
      <Promo loggedIn={loggedIn}/>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
      <NavTab />
    </>
  );
}

export default Main;

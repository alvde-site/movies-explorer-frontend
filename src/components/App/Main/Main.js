import Navigation from "../Navigation/Navigation";
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "../Main/Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main({ loggedIn }) {
  return (
    <>
      <Navigation />
      <Promo loggedIn={loggedIn} />
      <main className="content">
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
      <NavTab />
    </>
  );
}

export default Main;

import Header from "../../Header/Header";

function Promo({loggedIn}) {

  return (
    <div className="promo">
      <Header loggedIn={loggedIn}/>
    </div>
  );
}

export default Promo;

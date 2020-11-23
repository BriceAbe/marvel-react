import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./index.css";
import Cookie from "js-cookie";
import logo from "./logo.png";

const Header = ({ loguer, setloguer }) => {
  const token = Cookie.get("token_marvel");
  console.log(token);
  if (token) {
    setloguer(true);
  }
  const history = useHistory();

  const deconnexion = () => {
    Cookie.remove("token_marvel");
    setloguer(false);
    history.push("/");
    window.location.reload(false);
  };

  return (
    <div className="header">
      <Link className="lien" to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <div className="header-contenu">
        <Link className="lien" to="/">
          <span>All Characters</span>
        </Link>{" "}
        <Link className="lien" to="/comics">
          <span>Comics</span>
        </Link>{" "}
        <Link className="lien" to="/favorites">
          <span>Favoris</span>
        </Link>
        {loguer ? (
          <button className="deconnect" onClick={deconnexion}>
            {" "}
            Déconnexion
          </button>
        ) : (
          <>
            <Link className="lien" to="/signup">
              <span className="signin">S'inscrire</span>
            </Link>
            <Link className="lien" to="/signin">
              <span className="signup">Login</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

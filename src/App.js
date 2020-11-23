import "./App.css";
import React, { useState } from "react";

import Cookie from "js-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import CharacterRoute from "./containers/CharacterRoute";
import AllComicsRoute from "./containers/AllComicsRoute";
import ComicRoute from "./containers/ComicRoute";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FavoritesRoute from "./containers/FavoritesRoute";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
library.add(faHeart);

function App() {
  const [token, settoken] = useState(Cookie.get("token") || null);
  const [loguer, setloguer] = useState("");

  const userToken = (token) => {
    if (token) {
      Cookie.set("token_marvel", token, { expires: 1000 });
      settoken(token);
      setloguer(true);
    } else {
      Cookie.remove("token");
      setloguer(false);
      settoken(null);
    }
  };
  return (
    <Router>
      <div className="homepage">
        <Header loguer={loguer} setloguer={setloguer} />

        <Switch>
          <Route path="/favorites/">
            <FavoritesRoute />
          </Route>
          <Route path="/character/:id">
            <CharacterRoute userToken={userToken} />
          </Route>
          <Route path="/comic/:id">
            <ComicRoute />
          </Route>
          <Route path="/comics">
            <AllComicsRoute userToken={userToken} />
          </Route>
          <Route path="/signin" loguer={loguer} setloguer={setloguer}>
            <Signin />
          </Route>
          <Route path="/signup" loguer={loguer} setloguer={setloguer}>
            <Signup userToken={userToken} />
          </Route>
          <Route path="/">
            <Home userToken={userToken} loguer={loguer} setloguer={setloguer} />{" "}
            {/*tous les personnages  */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

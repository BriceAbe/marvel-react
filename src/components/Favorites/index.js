import React, { useState, useEffect } from "react";
import Title from "../Title";
import axios from "axios";
import Cookie from "js-cookie";
import "./index.css";

import Comic from "../Comic";
import Character from "../Character";

const Favorites = () => {
  const [isLoading, setisLoading] = useState(true);
  const [favoritesComics, setFavoritesComics] = useState();
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const token = Cookie.get("token_marvel");
  const fetchFavorites = async () => {
    try {
      const getFavorites = await axios.post(
        "https://marvel-backendbybrice.herokuapp.com/getFavorites",
        {
          token: token,
        }
      );
      setFavoritesComics(getFavorites.data.favoritesComics);
      setFavoritesCharacters(getFavorites.data.favoritesCharacters);
      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return isLoading ? (
    <>
      <img
        className="chargement"
        src="https://media.giphy.com/media/3GnKKEw2v7bXi/source.gif"
        alt=""
      />
    </>
  ) : (
    <>
      <Title titre="Favoris" inputsearch={false} />
      <h3>Comics favoris</h3>
      <div className="container-fav">
        {favoritesComics.map((elem) => (
          <Comic
            key={elem.id_marvel}
            title={elem.title}
            id={elem.id_marvel}
            image={elem.picture}
            description={elem.description}
            sizeS="fav"
            favorite={true}
          />
        ))}
      </div>
      <h3>Personnages favoris</h3>
      <div className="container-fav">
        {favoritesCharacters.map((elem) => (
          <Character
            key={elem.id_marvel}
            name={elem.name}
            id={elem.id_marvel}
            image={elem.picture}
            description={elem.description}
            sizeS="fav"
            favorite={true}
          />
        ))}
      </div>
    </>
  );
};

export default Favorites;

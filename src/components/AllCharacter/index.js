import React, { useState, useEffect } from "react";
import axios from "axios";

import Cookie from "js-cookie";
import Character from "../Character";
import "./index.css";
import Title from "../Title";

const AllCharacter = ({ userToken, loguer, setloguer }) => {
  const [characters, setCharacters] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [numberPages, setnumberPages] = useState();

  const token = Cookie.get("token_marvel");

  const fetchAxios = async () => {
    try {
      const response = await axios.get(
        "https://marvel-backendbybrice.herokuapp.com/allcharacters"
      );

      setCharacters(response.data.data.results);
      setnumberPages((Number(response.data.data.total) / 100).toFixed());
      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFavorites = async () => {
    try {
      const getFavorites = await axios.post(
        "https://marvel-backendbybrice.herokuapp.com/getFavorites",
        {
          token: token,
        }
      );

      const mapping = getFavorites.data.favoritesCharacters.map(
        (elem) => elem.id_marvel
      );
      setFavorites(mapping);
      setloguer(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchAxios();
  }, [token, loguer]);

  console.log(characters);
  const pagination = [];
  const paginationfetchAxios = async (limit, offset) => {
    try {
      const response = await axios.post(
        "https://marvel-backendbybrice.herokuapp.com/allcharacters",
        {
          limit: limit,
          offset: offset,
        }
      );

      setCharacters(response.data.data.results);

      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  for (let i = 0; i < 15; i++) {
    let offset = 0;
    if (i === 0) {
      offset = 0;
    } else {
      offset = i * 100;
    }
    const limit = 100;
    pagination.push(
      <h2
        className="bouton-page"
        onClick={() => paginationfetchAxios(limit, offset)}
      >
        {i + 1}
      </h2>
    );
  }

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
      <Title
        titre="All Characters"
        setCharacters={setCharacters}
        characters={characters}
        type="characters"
        inputsearch={true}
      />
      <div className="pagination"> {pagination}</div>
      <div className="container-character">
        {}
        {characters.map((elem) => (
          <Character
            key={elem.id}
            name={elem.name}
            id={elem.id}
            image={elem.thumbnail}
            description={elem.description}
            sizeS={true}
            favorite={favorites.indexOf(elem.id) !== -1 ? true : false}
            userToken={userToken}
          />
        ))}
      </div>
    </>
  );
};

export default AllCharacter;

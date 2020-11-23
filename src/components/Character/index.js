import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookie from "js-cookie";

import "./index.css";

const Character = ({ id, image, description, name, sizeS, favorite }) => {
  const [favory, setFavory] = useState(favorite);
  const token = Cookie.get("token_marvel");

  let typeaffichage = "";
  if (sizeS === true) {
    typeaffichage = "card-character";
  } else if (sizeS === false) {
    typeaffichage = "card-character-details";
  } else {
    typeaffichage = "card-character-fav";
  }
  //add a favorite
  const formData = new FormData();
  const addFavorite = async () => {
    const picture = image.path + "." + image.extension;

    if (token) {
      formData.append("name", name);
      formData.append("id_marvel", id);
      formData.append("picture", picture);
      formData.append("description", description);
      formData.append("favorite", true);
      formData.append("token", token);
      const response = await axios.post(
        "https://marvel-backendbybrice.herokuapp.com/addFavorisCharacters",
        formData
      );
      setFavory(response.data);
    } else {
      alert("merci de vous authentifier pour ajouter des favoris");
    }
  };

  return (
    <div className="lecharacter">
      <div className="decribe-character">
        <span>{name}</span>
        <FontAwesomeIcon
          className="iconPress"
          icon="heart"
          size="3x"
          color={favory ? "gold" : "white"}
          onClick={() => addFavorite()}
        />
      </div>
      <Link
        to={{
          pathname: `/character/${id}`,
          state: {
            id: id,
            image: image,
            name: name,
            description: description,
            favorite: favorite,
          },
        }}
      >
        <img
          className={typeaffichage}
          src={
            image.path === undefined
              ? image
              : image.path + "." + image.extension
          }
          alt={name}
        />
      </Link>
    </div>
  );
};

export default Character;

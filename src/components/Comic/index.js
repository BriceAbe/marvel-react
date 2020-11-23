import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookie from "js-cookie";
import "./index.css";

const Comic = ({ id, image, description, title, sizeS, favorite }) => {
  const [favory, setFavory] = useState(favorite);
  const token = Cookie.get("token_marvel");

  let typeaffichage = "";
  if (sizeS === true) {
    typeaffichage = "card-comics";
  } else if (sizeS === false) {
    typeaffichage = "card-comics-details";
  } else {
    typeaffichage = "card-comics-fav";
  }
  //add a favorite
  const formData = new FormData();
  const addFavorite = async () => {
    const picture = image.path + "." + image.extension;

    if (token) {
      formData.append("title", title);
      formData.append("id_marvel", id);
      formData.append("picture", picture);
      formData.append("description", description);
      formData.append("favorite", true);
      formData.append("token", token);
      const response = await axios.post(
        "https://marvel-backendbybrice.herokuapp.com/addFavorisComics",
        formData
      );
      setFavory(response.data);
    } else {
      alert("merci de vous authentifier pour ajouter des favoris");
    }
  };

  return (
    <div className="lecomic">
      <div className="decribe-comic">
        <span>{title}</span>
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
          pathname: `/comic/${id}`,
          state: {
            id: id,
            image: image,
            title: title,
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
          alt={title}
        />
      </Link>
    </div>
  );
};

export default Comic;

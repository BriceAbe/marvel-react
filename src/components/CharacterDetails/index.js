import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Character from "../Character";

import "./index.css";
import Title from "../Title";

const CharacterDetails = () => {
  const [characters, setCharacters] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();

  const { id, name, image, description, favorite } = location.state;
  console.log(description);
  const fetchDataCharacter = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/character/`, {
        id: id,
      });

      setCharacters(response.data.data);

      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataCharacter();
  }, []);

  return isLoading ? (
    <span>encharge</span>
  ) : (
    <div className="fond">
      <Title titre={name} inputsearch={false} />
      <p className="comics-text">{description}</p>
      <div className="main-desc">
        <div className="container-description-character">
          <Character
            className="card-character-details"
            image={image}
            sizeS={false}
            favorite={favorite}
          />
        </div>

        <div className="container-comics-characters">
          <div className="comics-characters">
            {characters.results.map((character) => (
              <div>
                <p>{character.title}</p>
                <img
                  className="img-comic"
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;

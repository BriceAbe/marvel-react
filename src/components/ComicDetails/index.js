import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Comic from "../Comic";

import "./index.css";
import Title from "../Title";

const ComicDetails = () => {
  const [comics, setComics] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();

  const { id, title, image, description, favorite } = location.state;

  const fetchDataComics = async () => {
    try {
      const response = await axios.post(
        `https://marvel-backendbybrice.herokuapp.com/comics/`,
        {
          id: id,
        }
      );

      setComics(response.data.data);
      console.log(comics);

      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDataComics();
  }, []);
  return isLoading ? (
    <span>encharge</span>
  ) : (
    <div className="fond">
      <Title titre={title} inputsearch={false} />
      <p className="comics-text">{description}</p>
      <div className="main-desc">
        <div className="container-description-character">
          <Comic
            className="card-character-details"
            image={image}
            sizeS={false}
            favorite={favorite}
          />
        </div>

        <div className="container-comics-characters">
          <div className="comics-characters">
            {comics.results.map((comic) => (
              <div>
                <p>{comic.title}</p>
                <img
                  className="img-comic"
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
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

export default ComicDetails;

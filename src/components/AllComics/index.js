import React, { useState, useEffect } from "react";
import axios from "axios";

import Comic from "../Comic";
import "./index.css";
import Title from "../Title";

const AllComics = () => {
  const [comics, setComics] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [numberPages, setnumberPages] = useState();

  const fetchAxios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/comics");

      setComics(response.data.data.results);
      setnumberPages((Number(response.data.data.total) / 100).toFixed());
      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFavorites = async () => {
    try {
      const getFavorites = await axios.get(
        "http://localhost:3000/getFavorites"
      );

      const mapping = getFavorites.data.favoritesComics.map(
        (elem) => elem.id_marvel
      );
      setFavorites(mapping);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchAxios();
  }, []);

  const pagination = [];
  const paginationfetchAxios = async (limit, offset) => {
    try {
      const response = await axios.post("http://localhost:3000/comicsPage", {
        limit: limit,
        offset: offset,
      });

      setComics(response.data.data.results);

      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  for (let i = 0; i < numberPages; i++) {
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
      <Title titre="All Comics" setComics={setComics} inputsearch={true} />
      <div className="pagination"> {pagination}</div>
      <div className="container-comics">
        {}
        {comics.map((elem) => (
          <Comic
            key={elem.id}
            title={elem.title}
            id={elem.id}
            image={elem.thumbnail}
            description={elem.description}
            sizeS={true}
            favorite={favorites.indexOf(elem.id) !== -1 ? true : false}
          />
        ))}
      </div>
    </>
  );
};

export default AllComics;

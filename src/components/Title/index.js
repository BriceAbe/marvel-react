import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Title = ({
  titre,
  setCharacters,
  characters,
  setComics,
  type,
  inputsearch,
}) => {
  const [search, setSearch] = useState("");
  let lien = "";

  const requete = async () => {
    if (search !== "") {
      if (type === "characters") {
        lien = "http://localhost:3000/searchCharacters";
        try {
          const response = await axios.post(lien, {
            nameSearch: search,
          });
          setCharacters(response.data.data.results);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        lien = "http://localhost:3000/searchComics";
        try {
          const response = await axios.post(lien, {
            nameSearch: search,
          });
          setComics(response.data.data.results);
        } catch (error) {
          console.log(error.message);
        }
      }
    } else {
      if (type === "characters") {
        lien = "http://localhost:3000/";
        try {
          const response = await axios.get(lien);
          setCharacters(response.data.data.results);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        lien = "http://localhost:3000/comics";
        try {
          const response = await axios.get(lien);
          setComics(response.data.data.results);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);

    requete();
    // console.log(search);
  };

  useEffect(() => {
    requete();
  }, [search]);
  return (
    <div className="titre-bar">
      {" "}
      <h1>{titre}</h1>{" "}
      {inputsearch ? (
        <input
          className="search-button"
          type="text"
          placeholder="search"
          value={search}
          onChange={handleChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Title;

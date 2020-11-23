import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
const Signup = ({ userToken, loguer, setloguer }) => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const history = useHistory();

  const fetchAxios = async () => {
    try {
      const response = await axios.post(
        "https://marvel-backendbybrice.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );
      Cookie.set("id", response.data._id);
      userToken(response.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  //
  const handleSubmit = (e) => {
    fetchAxios();
    e.preventDefault();

    history.push("/");
  };

  //
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setusername(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setemail(value);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setpassword(value);
  };

  return (
    <div className="App">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleUsernameChange}
          required
          name="username"
          value={username}
        />
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          required
          name="email"
          value={email}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
          required
          name="password"
          value={password}
        />

        <input
          className="signup-input-submit"
          type="submit"
          value="S'inscrire"
        />
      </form>
    </div>
  );
};

export default Signup;

import { useState, useEffect } from "react";

const Home = () => {
  let [userName, setUserName] = useState("");

  const handleClick = () => {
    localStorage.setItem("user-name", userName);
    window.location.reload(false);
  };

  return (
    <div className="home-container">
      <div className="name-wrapper">
        <label>Hello, what's your name?</label>
        <input
          className="bottom-border-input name-input"
          type="text"
          autoComplete="off"
          onChange={(event) => setUserName(event.target.value)}
        ></input>
      </div>
      <button role="button" className="continue-btn" onClick={handleClick}>
        Continue
      </button>
    </div>
  );
};

export default Home;

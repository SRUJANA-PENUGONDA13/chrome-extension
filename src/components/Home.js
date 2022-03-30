import { useState, useEffect } from "react";
import weather from "../apis/weather";

const Home = () => {
  let [userName, setUserName] = useState("");

  const getWeatherData = async (latitude, longitude) => {
    const response = await weather.get("/weather");
    let data = response.data;
    let dataObj = JSON.parse(data.replace("test(", "").replace(")", "").trim());
    let temperature = dataObj.main.temp - 273.15;
    localStorage.setItem("temperature", Math.round(temperature));
    localStorage.setItem("data", data);
  };
  const handleClick = () => {
    localStorage.setItem("user-name", userName);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude, longitude;
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          getWeatherData(latitude, longitude);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
    }
  }, []);
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
      <a
        role="button"
        className="continue-btn"
        href="/focus"
        onClick={handleClick}
      >
        Continue
      </a>
    </div>
  );
};

export default Home;

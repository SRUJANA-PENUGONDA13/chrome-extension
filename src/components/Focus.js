import { useEffect, useState } from "react";
import famousQuotes from "../data/quotes";

const Focus = () => {
  let [focus, setFocus] = useState("");
  let [temperature, setTemperature] = useState("");
  let [weatherIcon, setWeatherIcon] = useState("");
  let [weatherStatus, setWeatherStatus] = useState("");
  let [currentTime, setCurrentTime] = useState("");
  let [greeting, setGreeting] = useState("");
  let [displayStatus, setDisplayStatus] = useState("active");
  let [focusUpdate, setFocusUpdate] = useState("");
  let [quote, setQuote] = useState();

  const updateWeatherIcon = (temperature) => {
    if (temperature >= 26) setWeatherIcon("fa-sun");
    else setWeatherIcon("fa-snowflake");
  };

  const updateWeatherStatus = (temperature) => {
    let wStatus = "";
    if (temperature >= 35) wStatus = "Very Hot";
    else if (temperature >= 30 && temperature < 35) wStatus = "Hot";
    else if (temperature >= 26 && temperature < 30) wStatus = "Normal";
    else if (temperature >= 20 && temperature <= 25) wStatus = "Cold";
    else wStatus = "Very Cold";

    setWeatherStatus(wStatus);
  };

  const getTemperature = () => {
    let temperature = localStorage.getItem("temperature");
    setTemperature(temperature);
    updateWeatherIcon(temperature);
    updateWeatherStatus(temperature);
  };

  const getGreeting = (ctime) => {
    const userName = localStorage.getItem("user-name");

    if (ctime.includes("AM")) {
      setGreeting("Good Morning " + userName);
    } else if (ctime.includes("PM")) {
      let hours = ctime.slice(0, 2).trim().replace(/:$/g, "");
      let noon = ["12", "01", "02", "03", "04", "05", "1", "2", "3", "4", "5"];

      if (noon.includes(hours)) setGreeting("Good Afternoon " + userName);
      else setGreeting("Good Evening " + userName);
    }
  };

  const getTime = () => {
    const date = new Date();
    let time = date.toLocaleTimeString().split(":");
    let ctime = time[0] + ":" + time[1] + " " + time[2].slice(-2);
    setCurrentTime(ctime);
    getGreeting(ctime);
  };

  const handleChange = (event) => {
    let taskName = "",
      formatedTask = "";
    if (event.key === "Enter") {
      taskName = event.target.value.toLowerCase();
      formatedTask = taskName[0].toUpperCase() + taskName.slice(1);
      setFocus(formatedTask);
      setDisplayStatus("inactive");
    }
  };

  const getRandomQuote = () => {
    const randomNumber = Math.floor(Math.random() * 13) + 1;
    setQuote(famousQuotes[randomNumber]);
  };

  useEffect(() => {
    getTemperature();
    getTime();
    getRandomQuote();
    setInterval(getTime, 60000);
  }, []);

  return (
    <div className="focus-container">
      <nav className="weather">
        <div className="temperature">
          <i className={`fa-solid ${weatherIcon} weather-icon`}></i>
          <p>
            {temperature}
            <sup className="temp-measure">°</sup>
          </p>
        </div>
        <p className="weather-state">{weatherStatus}</p>
      </nav>
      <main className="focus-body">
        <time className="time">{currentTime}</time>
        <p className="greeting">{greeting}</p>
        <div className="focus-wrapper">
          <label className="focus-label">
            What's your main focus for today?
          </label>
          <input
            className={`bottom-border-input focus-input ${displayStatus}`}
            type="text"
            autoComplete="off"
            onKeyPress={handleChange}
          ></input>
          {displayStatus === "inactive" && (
            <div className="focus-task">
              <input
                type="checkbox"
                className="focus-checkbox"
                onClick={() =>
                  !focusUpdate
                    ? setFocusUpdate("text-strike")
                    : setFocusUpdate("")
                }
                required
              ></input>
              <label className={`focus-taskName ${focusUpdate}`}>{focus}</label>
            </div>
          )}
        </div>
      </main>
      <footer className="quote">{quote}</footer>
    </div>
  );
};

export default Focus;

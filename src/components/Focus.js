import { useEffect, useState } from "react";

const famousQuotes = {
  0: "Make time to enjoy the simple things in life",
  1: "Doing what you like is freedom. Liking what you do is happiness.",
  2: "Be happy with what you have. Be excited about what you want",
  3: "Fall in Love with the process of becoming the very best version of yourself",
  4: "Do not be shy to give credits to your fellow programmer if they helped you",
  5: "You must find the courage to leave the table if respect is no longer served",
  6: "Strong people do not put others down they lift them up",
  7: "Become the kind of leader that people would follow voluntarily even if you had no title or position",
  8: "Give yourself enough respect to walk away from someone who does not see your worth",
  9: "You lose a lot af friends when you get serious about your future and goals",
  10: "A bug a day, keeps the developer inside you awake",
  11: "Hapiness starts with you not with your relationships, not with your job, not with your money, but with you.",
  12: "You do not inspire others by showing them how amazing you are. You inspire them by showing them how amazing they are",
  13: "New energy is entering your life. Changes are happening for you. Things are getting better. Everything is aligning. Belssings are coming.",
};

const Focus = () => {
  let [focus, setFocus] = useState("");
  let [temperature, setTemperature] = useState("");
  let [weatherIcon, setWeatherIcon] = useState("");
  let [weatherStatus, setWeatherStatus] = useState("");
  let [time, setTime] = useState("");
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

  const getTime = () => {
    const date = new Date();
    let time = date.toLocaleTimeString();
    time = time.slice(0, 5) + time.slice(8);
    setTime(time);
  };

  const getGreeting = () => {
    const userName = localStorage.getItem("user-name");

    if (time.slice(6, 8) === "AM") {
      setGreeting("Good Morning " + userName);
    } else {
      let hours = time.slice(0, 2);
      let noon = ["12", "01", "02", "03", "04", "05"];
      if (hours in noon) setGreeting("Good Afternoon");
      else setGreeting("Good Evening " + userName);
    }
  };

  const handleChange = (event) => {
    if (event.key === "Enter") {
      setFocus(event.target.value);
      setDisplayStatus("inactive");
    }
  };

  const getRandomQuote = () => {
    const randomNumber = Math.floor(Math.random() * 13 + 1);
    setQuote(famousQuotes[randomNumber]);
  };

  useEffect(() => {
    getTemperature();
    getTime();
    getGreeting();
    getRandomQuote();
  }, []);

  setInterval(getTime, 60000);
  setInterval(getGreeting, 60 * 60000);

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
        <time className="time">{time}</time>
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

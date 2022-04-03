import { useEffect, useState } from "react";
import { useReducer } from "react";
import famousQuotes from "../data/quotes";
import { focusReducer } from "../reducers/focusPageReducer";
import getGreeting from "../utils/greeting";
import getTime from "../utils/time";
import getWeatherStatus from "../utils/weather";

const Focus = () => {
  const initialState = {
    focusTask: "",
    taskStatus: "",
    greeting: "",
    quote: "",
    weather: "",
    temperature: "",
    currentTime: "",
    displayStatus: "active",
  };
  const [state, dispatch] = useReducer(focusReducer, initialState);

  const setTemperatureAndWeather = () => {
    const temperature = localStorage.getItem("temperature");
    dispatch({ type: "UPDATE_TEMPERATURE", payload: temperature });
    const weatherStatus = getWeatherStatus(temperature);
    dispatch({ type: "UPDATE_WEATHER", payload: weatherStatus });
  };

  const setTimeAndGreeting = () => {
    const currentTime = getTime();
    dispatch({ type: "UPDATE_TIME", payload: currentTime });
    let greeting = getGreeting(currentTime);
    dispatch({ type: "UPDATE_GREETING", payload: greeting });
  };

  const setRandomQuote = () => {
    const randomNumber = Math.floor(Math.random() * 13) + 1;
    dispatch({ type: "UPDATE_QUOTE", payload: famousQuotes[randomNumber] });
  };

  const handleChange = (event) => {
    let taskName = "",
      formatedTask = "";
    if (event.key === "Enter") {
      taskName = event.target.value.toLowerCase();
      formatedTask = taskName[0].toUpperCase() + taskName.slice(1);
      dispatch({ type: "ADD_TASK", payload: formatedTask });
      dispatch({ type: "TOGGLE_INPUT", payload: "inactive" });
    }
  };

  useEffect(() => {
    setTemperatureAndWeather();
    setTimeAndGreeting();
    setRandomQuote();
    setInterval(setTimeAndGreeting, 60000);
  }, []);

  return (
    <div className="focus-container">
      <nav className="weather">
        <div className="temperature">
          <i
            className={`fa-solid ${
              state.temperature >= 26 ? "fa-sun" : "fa-snowflake"
            } weather-icon`}
          ></i>
          <p>
            {state.temperature}
            <sup className="temp-measure">°</sup>
          </p>
        </div>
        <p className="weather-state">{state.weather}</p>
      </nav>
      <main className="focus-body">
        <time className="time">{state.currentTime}</time>
        <p className="greeting">{state.greeting}</p>
        <div className="focus-wrapper">
          <label className="focus-label">
            What's your main focus for today?
          </label>
          <input
            className={`bottom-border-input focus-input ${state.displayStatus}`}
            type="text"
            autoComplete="off"
            onKeyPress={handleChange}
          ></input>
          {state.displayStatus === "inactive" && (
            <div className="focus-task">
              <input
                type="checkbox"
                className="focus-checkbox"
                onClick={() =>
                  state.taskStatus
                    ? dispatch({
                        type: "UPDATE_TASK_STATUS",
                        payload: "",
                      })
                    : dispatch({
                        type: "UPDATE_TASK_STATUS",
                        payload: "text-strike",
                      })
                }
                required
              ></input>
              <label className={`focus-taskName ${state.taskStatus}`}>
                {state.focusTask}
              </label>
            </div>
          )}
        </div>
      </main>
      <footer className="quote">{state.quote}</footer>
    </div>
  );
};

export default Focus;

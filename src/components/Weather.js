import React, { useEffect, useReducer } from "react";
import { weatherReducer } from "../reducers/weatherReducer";
import weatherAPI from "../apis/weather";

const Weather = () => {
  const initialState = { location: "", temperature: "", weatherIcon: "" };

  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const getWeatherData = async (latitude, longitude) => {
    let queryparams;
    const response = await weatherAPI.get("/weather", {
      params: {
        lon: longitude,
        lat: latitude,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
      },
    });
    try {
      if (response != null) {
        const { name, main, weather } = response.data;
        dispatch({ type: "SET_LOCATION", payload: name });
        dispatch({
          type: "SET_TEMPERATURE",
          payload: Math.round(main.temp - 273.15),
        });
        dispatch({ type: "SET_WEATHER_ICON", payload: weather[0].icon });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
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
    <React.Fragment>
      <div className="temperature">
        <img
          className="weatherIcon"
          src={`https://openweathermap.org/img/wn/${state.weatherIcon}@2x.png`}
        />
        <p>
          {state.temperature}
          <sup className="temp-measure">°</sup>
        </p>
      </div>
      <p className="location">{state.location}</p>
    </React.Fragment>
  );
};

export default Weather;

import axios from "axios";

export default axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com/",
  params: {
    callback: "test",
    id: "2172797",
    lang: "eng",
  },
  headers: {
    "X-RapidAPI-Host": process.env.REACT_APP_WEATHER_API_HOST,
    "X-RapidAPI-Key": process.env.REACT_APP_WEATHER_API_KEY,
  },
});

import axios from "axios";

export default axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com/",
  params: {
    callback: "test",
    id: "2172797",
    lang: "eng",
  },
  headers: {
    "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
    "X-RapidAPI-Key": "9d56960b7bmsh1ab16e59ddd16f8p11c6a7jsn4f9accfaf47e",
  },
});

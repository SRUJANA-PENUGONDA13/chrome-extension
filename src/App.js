import { useEffect, useState } from "react";
import useWindowDimensions from "../src/customHooks/windowDimensions";
import Home from "./components/Home";
import Focus from "./components/Focus";
import imageIds from "./data/imageIds";
import "./css/App.css";
import "./css/Reset.css";
import "./css/Generic.css";

function App() {
  const [imageURL, setImageURL] = useState();
  const [userName, setUserName] = useState(null);

  const windowdimensions = useWindowDimensions();

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 30) + 1;
    let URL =
      "https://picsum.photos/id/" +
      imageIds[randomNumber] +
      "/" +
      windowdimensions.width +
      "/" +
      windowdimensions.height;
    setImageURL(URL);
    setUserName(localStorage.getItem("user-name"));
  }, [windowdimensions.height, windowdimensions.width]);

  useEffect(() => {
    setUserName(localStorage.getItem("user-name"));
  }, []);

  const scenery = {
    backgroundImage: `url(${imageURL})`,
  };

  return (
    <div style={scenery} className="main-container">
      {userName === null ? <Home /> : <Focus />}
    </div>
  );
}

export default App;

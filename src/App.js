import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useWindowDimensions from "../src/customHooks/windowDimensions";
import Home from "./components/Home";
import Focus from "./components/Focus";
import imageIds from "./data/imageIds";
import "./css/App.css";
import "./css/Reset.css";
import "./css/Generic.css";

function App() {
  const [imageURL, setImageURL] = useState();
  const window = useWindowDimensions();

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 65) + 1;
    let URL =
      "https://picsum.photos/id/" +
      imageIds[randomNumber] +
      "/" +
      window.width +
      "/" +
      window.height;
    setImageURL(URL);
  }, [window.height, window.width]);

  const scenery = {
    backgroundImage: `url(${imageURL})`,
  };

  return (
    <div style={scenery} className="main-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/focus" element={<Focus />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

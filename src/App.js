import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Focus from "./components/Focus";
import "./css/App.css";
import "./css/Reset.css";
import "./css/Generic.css";

function App() {
  const [imageURL, setImageURL] = useState();
  const [windowWidth, setWindowWidth] = useState("");
  const [windowHeight, setWindowHeight] = useState("");

  useEffect(() => {
    getWindowDimensions();
    let URL = "https://picsum.photos/" + windowWidth + "/" + windowHeight;
    setImageURL(URL);
  }, [windowWidth, windowHeight]);

  const getWindowDimensions = () => {
    const hasWindow = typeof window !== "undefined";
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    setWindowWidth(width.toString());
    setWindowHeight(height.toString());
  };

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

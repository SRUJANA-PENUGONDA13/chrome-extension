import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  const [windowWidth, setWindowWidth] = useState("");
  const [windowHeight, setWindowHeight] = useState("");

  const getWindowDimensions = () => {
    const hasWindow = typeof window !== "undefined";
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    setWindowWidth(width.toString());
    setWindowHeight(height.toString());
  };

  useEffect(() => {
    getWindowDimensions();
  }, [windowWidth, windowHeight]);

  return { height: windowHeight, width: windowWidth };
};

export default useWindowDimensions;

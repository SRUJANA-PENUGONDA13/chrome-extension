import React, { useEffect, useState } from "react";
import getTime from "../utils/time";
import getGreeting from "../utils/greeting";

const TimeAndGreeting = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  const setTimeAndGreeting = () => {
    const ctime = getTime();
    setCurrentTime(ctime);
    setGreeting(getGreeting(ctime));
  };

  useEffect(() => {
    setTimeAndGreeting();
    const date = new Date();
    const seconds = date.toLocaleTimeString("en-US", {
      second: "numeric",
      hour12: true,
    });
    setInterval(setTimeAndGreeting, 60000 - (seconds ? seconds : 0) * 1000);
  }, []);

  return (
    <React.Fragment>
      <time className="time">{currentTime}</time>
      <p className="greeting">{greeting}</p>
    </React.Fragment>
  );
};

export default TimeAndGreeting;

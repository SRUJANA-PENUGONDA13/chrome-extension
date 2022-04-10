const getTime = () => {
  const date = new Date();
  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const time = date.toLocaleTimeString("en-US", options);
  return time;
};

export default getTime;

const getWeatherStatus = (temperature) => {
  console.log("Temperature", temperature);
  let wStatus = "";
  if (temperature >= 35) wStatus = "Very Hot";
  else if (temperature >= 30 && temperature < 35) wStatus = "Hot";
  else if (temperature >= 26 && temperature < 30) wStatus = "Normal";
  else if (temperature >= 20 && temperature <= 25) wStatus = "Cold";
  else wStatus = "Very Cold";
  return wStatus;
};

export default getWeatherStatus;

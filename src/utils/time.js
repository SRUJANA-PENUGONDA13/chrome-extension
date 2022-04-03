const getTime = () => {
  const date = new Date();
  let time = date.toLocaleTimeString().split(":");
  let ctime = time[0] + ":" + time[1] + " " + time[2].slice(-2);
  return ctime;
};

export default getTime;

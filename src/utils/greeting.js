const getGreeting = (ctime) => {
  const userName = localStorage.getItem("user-name");
  let greeting = "";
  if (ctime !== "" && ctime !== undefined) {
    if (ctime.includes("AM")) {
      greeting = "Good Morning " + userName;
    } else if (ctime.includes("PM")) {
      let hours = ctime.slice(0, 2).trim().replace(/:$/g, "");
      let noon = ["12", "01", "02", "03", "04", "05", "1", "2", "3", "4", "5"];
      if (noon.includes(hours)) {
        greeting = "Good Afternoon " + userName;
      } else {
        greeting = "Good Evening " + userName;
      }
    }
  }

  return greeting;
};

export default getGreeting;

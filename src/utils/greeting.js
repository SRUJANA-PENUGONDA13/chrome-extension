const getGreeting = (time) => {
  const userName = localStorage.getItem("user-name");
  let greeting = "";
  const hours = parseInt(time.split(":")[0]);

  if (time.toString().includes("AM")) {
    greeting = "Good Morning " + userName;
  } else {
    if (hours === 12 || (hours >= 1 && hours < 6)) {
      greeting = "Good Afternoon " + userName;
    } else {
      greeting = "Good Evening " + userName;
    }
  }

  return greeting;
};

export default getGreeting;

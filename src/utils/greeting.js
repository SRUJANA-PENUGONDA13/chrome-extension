const getGreeting = (time) => {
  const userName = localStorage.getItem("user-name");
  let greeting = "";
  if (time.toString().includes("AM")) {
    greeting = "Good Morning " + userName;
  } else {
    greeting = "Good Afternoon " + userName;
  }

  return greeting;
};

export default getGreeting;

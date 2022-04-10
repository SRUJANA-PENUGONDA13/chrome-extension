import { useEffect, useReducer } from "react";
import famousQuotes from "../data/quotes";
import { focusReducer } from "../reducers/focusReducer";
import Weather from "./Weather";
import TimeAndGreeting from "./TimeAndGreeting";

const Focus = () => {
  const initialState = {
    focusTask: localStorage.getItem("task"),
    taskStatus: "",
    quote: "",
    displayStatus: "active",
  };
  const [state, dispatch] = useReducer(focusReducer, initialState);

  const setRandomQuote = () => {
    const randomNumber = Math.floor(Math.random() * 13) + 1;
    dispatch({ type: "UPDATE_QUOTE", payload: famousQuotes[randomNumber] });
  };

  const handleChange = (event) => {
    let taskName = "",
      formatedTask = "";
    if (event.key === "Enter") {
      taskName = event.target.value.toLowerCase();
      formatedTask = taskName[0].toUpperCase() + taskName.slice(1);
      localStorage.setItem("task", formatedTask);
      dispatch({ type: "ADD_TASK", payload: formatedTask });
      dispatch({ type: "TOGGLE_INPUT", payload: "inactive" });
    }
  };

  useEffect(() => {
    setRandomQuote();
  }, []);

  return (
    <div className="focus-container">
      <nav className="weather">
        <Weather />
      </nav>
      <main className="focus-body">
        <TimeAndGreeting />
        <div className="focus-wrapper">
          <label className="focus-label">
            What's your main focus for today?
          </label>
          {state.focusTask === null && (
            <input
              className={`bottom-border-input focus-input`}
              type="text"
              autoComplete="off"
              onKeyPress={handleChange}
            ></input>
          )}
          {state.focusTask !== null && (
            <div className="focus-task">
              <input
                type="checkbox"
                className="focus-checkbox"
                onClick={() =>
                  state.taskStatus
                    ? dispatch({
                        type: "UPDATE_TASK_STATUS",
                        payload: "",
                      })
                    : dispatch({
                        type: "UPDATE_TASK_STATUS",
                        payload: "text-strike",
                      })
                }
                required
              ></input>
              <label className={`focus-taskName ${state.taskStatus}`}>
                {state.focusTask}
              </label>
            </div>
          )}
        </div>
      </main>
      <footer className="quote">{state.quote}</footer>
    </div>
  );
};

export default Focus;

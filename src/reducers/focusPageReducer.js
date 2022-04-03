export function focusReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, focusTask: action.payload };

    case "UPDATE_TASK_STATUS":
      return { ...state, taskStatus: action.payload };

    case "UPDATE_GREETING":
      return { ...state, greeting: action.payload };

    case "UPDATE_QUOTE":
      return { ...state, quote: action.payload };

    case "UPDATE_WEATHER":
      return { ...state, weather: action.payload };

    case "UPDATE_TEMPERATURE":
      return { ...state, temperature: action.payload };

    case "UPDATE_TIME":
      return { ...state, currentTime: action.payload };

    case "TOGGLE_INPUT":
      return { ...state, displayStatus: action.payload };
  }
}

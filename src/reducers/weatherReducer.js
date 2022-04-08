export function weatherReducer(state, action) {
  switch (action.type) {
    case "SET_LOCATION":
      return { ...state, location: action.payload };

    case "SET_TEMPERATURE":
      return { ...state, temperature: action.payload };

    case "SET_WEATHER_ICON":
      return { ...state, weatherIcon: action.payload };
  }
}

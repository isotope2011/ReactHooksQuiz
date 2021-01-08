export const counterStates = {
    count: 0
  }
  
  export const counterReducer = (state, { type, count }) => {
    switch (type) {
      case "INCREMENT":
        return {
          ...state,
          count: state.count + 1
        };
      case "DECREMENT":
        return {
          ...state,
          count: state.count - 1
        };
      case "RESET":
        return counterStates;
      case "SET_VALUE":
        return {
          ...state,
          count
        };
      default:
        return state;
    }
  };
  
export const counterStates = {
    count: 0
  }
  
  export const counterReducer = (state, action) => {
    switch (action.type) {
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
        return {
          ...state,
          count: 0
        };
      case "SET_VALUE":
        return {
          ...state,
          count: action.data
        };
      default:
        return state;
    }
  };
  
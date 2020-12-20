export const globalStates = {
  data: null,
  index: 0,
  debugData: null,
  error: null,
  score: {
    correct: 0,
    wrong: 0,
  },
  status: null,
};

export const globalReducer = (
  state,
  { type, data, error, debugData, index, status, score }
) => {
  switch (type) {
    case "THROW_ERROR":
      return {
        ...state,
        error,
      };
    case "UPDATE_DATA":
      return {
        ...state,
        data,
      };
    case "UPDATE_DEBUG_DATA":
      return {
        ...state,
        debugData,
      };
    case "UPDATE_CURRENT_INDEX":
      return {
        ...state,
        index,
      };
    case "UPDATE_SCORE":
      console.log("reducer", score);
      return {
        ...state,
        score,
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        status,
      };
    default:
      return state;
  }
};

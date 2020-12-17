export const globalStates = {
  data: null,
  index: 0,
  debugData: null,
  error: null,
  status: null
};

export const globalReducer = (state, { type, data, error, debugData, index, status }) => {
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
    case "POST_DATA_SUCCESS":
      console.log('reducer', status)
      return {
        ...state,
        status
      }
    default:
      return state;
  }
};

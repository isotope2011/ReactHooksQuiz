export const globalActions = ({ dispatch }) => {
  return {
    throwError: (error) => {
      dispatch({ type: "THROW_ERROR", error });
    },
    updateData: (data) => {
      dispatch({ type: "UPDATE_DATA", data });
    },
    updateDebugData: (debugData) => {
      dispatch({ type: "UPDATE_DEBUG_DATA", debugData });
    },
    updateCurrentIndex: (index) => {
      dispatch({ type: "UPDATE_CURRENT_INDEX", index });
    }
  }; 
};

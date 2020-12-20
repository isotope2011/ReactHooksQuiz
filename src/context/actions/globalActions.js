import axios from "axios";

const postQuiz = (data) => axios.post("/api/quiz", data).then((res) => res.data);

// thunk action example
// const postQuizData = data => {
//   return (dispatch) => {
//     return dispatch(postQuiz(data)).then(() => {
//       return Promise.resolve();
//     })
//   }
// }

export const globalActions = ({ dispatch, state: { globalStates: state } }) => {
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
    },
    asyncPostQuizData: async (data) => {
      await postQuiz(data).then(({ status, ansType }) => {
        const score = { [ansType]: state.score[ansType] + 1 };
        dispatch({
          type: 'UPDATE_SCORE',
          score: { ...state.score, ...score }
        });
        dispatch({ type: 'UPDATE_STATUS', status });
      });
    },
    updateStatus: (status) => {
      dispatch({ type: 'UPDATE_STATUS', status });
    },
  }; 
};

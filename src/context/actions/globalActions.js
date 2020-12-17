import axios from "axios";

const postQuiz = (data) => axios.post("/api/quiz", data).then((res) => {
  console.log(res.data);
  return res.data;
});

// thunk action example
// const postQuizData = data => {
//   return (dispatch) => {
//     return dispatch(postQuiz(data)).then(() => {
//       return Promise.resolve();
//     })
//   }
// }

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
    },
    asyncPostQuizData: async (data) => {
      await postQuiz(data).then((res) => {
        console.log('async', res);
        dispatch({ type: 'POST_DATA_SUCCESS', ...res });
      })
    },
    resetStatus: () => {
      dispatch({ type: 'POST_DATA_SUCCESS', status: null });
    },
  }; 
};

export const counterActions = ({ dispatch }) => {
  return {
    increment:  () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" }),
    setValue: count => externSetValue({ dispatch, count })
  }
}

function externSetValue({ dispatch, count }) {
  dispatch({ type: "SET_VALUE", count });
}

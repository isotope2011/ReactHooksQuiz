import React, { useContext, useCallback } from "react";
import { StoreContext } from "../context/store/storeContext";

export default () => {
  const { state, actions } = useContext(StoreContext);
  const { globalStates: { index } } = state;
  const onClick = useCallback((event) => {
    actions.viewActions.updateView(event.target.value);
  });

  let label = 'Get Started';
  if (index) {
    label = 'Continue';
  }

  return (
    <>
      <h2>Word Quiz</h2>
      <strong>Take this word quiz for fun!</strong>
      <p>Good Luck!</p>
      <button onClick={onClick} value="Quiz">{label}</button>
    </>
  );
};

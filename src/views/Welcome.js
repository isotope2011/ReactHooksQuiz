import React, { useContext, useCallback } from "react";
import { StoreContext } from "../context/store/storeContext";

export default () => {
  const { actions } = useContext(StoreContext);
  const onClick = useCallback((event) => {
    actions.viewActions.updateView(event.target.value);
  });

  return (
    <>
      <h2>Word Quiz</h2>
      <strong>Take this word quiz for fun!</strong>
      <p>Lets get started!</p>
      <button onClick={onClick} value="Quiz">{"Get Started"}</button>
    </>
  );
};

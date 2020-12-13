import React, { useContext } from "react";
import { StoreContext } from "../context/store/storeContext";

export default () => {
  const { state, actions } = useContext(StoreContext);
  const valueRandom = () => Math.round(Math.random() * (1000 - 1) + 1);

  return (
    <div>
      <h2>Counter</h2>
      <p>{state.counterStates.count}</p>
      <button onClick={() => { actions.counterActions.increment(); }}>
        INCREMENT
      </button>
      <button onClick={() => { actions.counterActions.decrement(); }}>
        DECREMENT
      </button>
      <button onClick={() => { actions.counterActions.reset(); }}>
        RESET
      </button>
      <button onClick={() => { actions.counterActions.setValue(valueRandom()); }}>
        VALUE RANDOM
      </button>
    </div>
  );
};

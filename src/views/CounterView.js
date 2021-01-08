import React, { useContext } from "react";
import { StoreContext } from "../context/store/storeContext";

export default () => {
  const { state, actions } = useContext(StoreContext);
  const valueRandom = () => Math.round(Math.random() * (1000 - 1) + 1);

  return (
    <div>
      <h2>Counter</h2>
      <p data-testid="counter">{state.counterStates.count}</p>
      <div>
        <button data-testid="increment" onClick={() => { actions.counterActions.increment(); }}>
          INCREMENT
        </button>
        <button data-testid="decrement" onClick={() => { actions.counterActions.decrement(); }}>
          DECREMENT
        </button>
        <button data-testid="reset" onClick={() => { actions.counterActions.reset(); }}>
          RESET
        </button>
        <button data-testid="random" onClick={() => { actions.counterActions.setValue(valueRandom()); }}>
          VALUE RANDOM
        </button>
      </div>
    </div>
  );
};

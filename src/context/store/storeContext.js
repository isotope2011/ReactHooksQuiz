import React, { createContext, useReducer, useCallback } from "react";
import { initialState, reducer } from "../reducers/reducers";
import { useActions } from "../actions";
import { applyMiddlewares, logger, reactThunk } from "../middleware";

// TODO: preload state here from storage or fetch request

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatchBase] = useReducer(reducer, initialState);
  const dispatcher = applyMiddlewares([logger, reactThunk]);
  const dispatch = useCallback(dispatcher({ dispatch: dispatchBase, state }), []);
  const actions = useActions(state, dispatch);

  return (
    <StoreContext.Provider value={{ actions, dispatch, state }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };

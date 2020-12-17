import React, { createContext, useReducer, useCallback } from "react";
import { initialState, reducer } from "../reducers/reducers";
import { useActions } from "../actions";
import { applyMiddlewares, logger, reactThunk } from "../middleware";

// preload state here from storage or fetch request

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatchBase] = useReducer(reducer, initialState);

  const middleWares = applyMiddlewares([logger, reactThunk]);
  
  const dispatch = useCallback(middleWares({ dispatch: dispatchBase, state }), []);
  
  const actions = useActions(state, dispatch);
  
  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };

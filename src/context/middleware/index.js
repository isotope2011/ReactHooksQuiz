import { compose } from "ramda";
// React middlewares
// - add on used to customize the dispatch function
// - between dispatching an action and prior to  meeting a reducer

// middlewares
function logger({ state }) {
  return (next) => (action) => {
    console.group('logger');
    console.log('before dispatch', action);
    const nextDispatch = next(action);
    console.log('after dispatch', state);
    console.groupEnd();
    return nextDispatch;
  };
}

// allows for both async and sync actions to dispatch function
// returns a method that takes action as a param
// dispatches an action, should return state
function reactThunk({ dispatch, state }) {
  return (next) => (action) => {
    console.log("thunk", typeof action, action);
    return typeof action === "function"
      ? action(dispatch, state)
      : next(action);
  };
}

function applyMiddlewares(middlewares = []) {
  return ({ state, dispatch }) => {
    const api = { state, dispatch };
    const chain = middlewares.map((middleware) => middleware(api));
    return compose(...chain)(dispatch);
  };
}

export { applyMiddlewares, reactThunk, logger };

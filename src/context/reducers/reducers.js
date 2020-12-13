import { initialState } from "../state/initialStates";
import { counterReducer } from "./counterReducer";
import { globalReducer } from "./globalReducer";
import { viewReducer } from "./viewReducer";

const reducer = (state = initialState, action) => {
  return {
    counterStates: counterReducer(state.counterStates, action),
    globalStates: globalReducer(state.globalStates, action),
    viewStates: viewReducer(state.viewStates, action),
  };
};

export { initialState, reducer };

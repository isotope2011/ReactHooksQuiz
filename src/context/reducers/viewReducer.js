import { views } from "../../views";

const viewMappings = {
  Welcome: views["Welcome"],
  Counter: views["CounterView"],
  Form: views["ReactHookForm"],
  YUPForm: views["ReactYUPForm"],
  ConfigForm: views["ReactConfigForm"],
  HelloWorld: views["HelloWorld"],
  Quiz: views["QuizView"],
  Summary: views["Summary"],
};

export const getView = (view) => viewMappings[view] || null;

export const viewStates = {
  pageView: null,
  view: "",
};

export const viewReducer = (state, { type, view }) => {
  switch (type) {
    case "UPDATE_VIEW":
      return {
        ...state,
        view,
      };
    case "UPDATE_PAGE_VIEW":
      return {
        ...state,
        pageView: getView(view),
      };
    case "RESET_VIEW":
      return viewStates;
    default:
      return state;
  }
};

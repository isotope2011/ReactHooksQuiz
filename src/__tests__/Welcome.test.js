import React, { useReducer } from "react";
import { render, renderHook, cleanup } from '../test-utils';

import Welcome from "../views/Welcome";
import { StoreContext } from "../context/store/storeContext";
import { initialState, reducer } from "../context/reducers/reducers";
import { useActions } from "../context/actions";

const RenderWithCustomValue = (component, initState = initialState) => {
  const { result: { current: [state, dispatch] } } = renderHook(() => useReducer(reducer, initState));
  const { result: { current: actions } } = renderHook(() => useActions(state, dispatch));
  return {
    ...render(
      <StoreContext.Provider value={{ actions, dispatch, state }}>
        {component}
      </StoreContext.Provider>
    )
  };
};

describe("Welcome Component", () => {
  afterEach(cleanup);

  test("Render word quiz", () => {
    const { getByText } = RenderWithCustomValue(<Welcome />);
    expect(getByText("Word Quiz")).toBeInTheDocument();
  });

  test("Show the 'Get Started' label to start the Quiz (Default)", () => {
    const { getByText } = RenderWithCustomValue(<Welcome />);
    expect(getByText('Get Started')).toBeInTheDocument();
  });
  
  test("Show the 'Continue' label to continue the Quiz", () => {
    const updatedState = {
      ...initialState,
      globalStates: {
        ...initialState.globalStates,
        index: 1,
      },
    };
    const { getByText } = RenderWithCustomValue(<Welcome />, updatedState);
    expect(getByText('Continue')).toBeInTheDocument();
  });

});

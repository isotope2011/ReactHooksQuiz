import React, { useReducer } from "react";
import { act, hookAct, render, renderHook, fireEvent, cleanup, screen, waitFor } from '../test-utils';

import Main from "../views/Main";
import { StoreContext } from "../context/store/storeContext";
import { initialState, reducer } from "../context/reducers/reducers";
import { useActions } from "../context/actions";

const views = [
    'Welcome',
    'Summary',
    'HelloWorld',
    'Counter',
    'Form',
    'YUPForm',
    'ConfigForm'
];

const getCurrentView = (view = '') => `Current View: - "${view}"`;
const getButtonTestId = view => `${view}-view`;
const RenderWithCustomValue = (component) => {
  const { result: { current: [state, dispatch] } } = renderHook(() => useReducer(reducer, initialState));
  const { result: { current: actions } } = renderHook(() => useActions(state, dispatch));

  return {
    ...render(
      <StoreContext.Provider value={{ actions, dispatch, state }}>
        {component}
      </StoreContext.Provider>
    )
  };
};

describe("Main Component", () => {
  afterEach(cleanup);

  test("render main component with Current View message", () => {
    const { getByText } = RenderWithCustomValue(<Main />);
    expect(getByText(getCurrentView())).toBeInTheDocument();
  });

  test("PageView is set and changed when pressing View buttons", () => {
    // dynamic solution looping thru views array and checking each view
    views.forEach(async view => {
      const { getByTestId, getByText } = RenderWithCustomValue(<Main />);
      const testId = getButtonTestId(view);
      const currentView = getCurrentView(view);

      hookAct(() => {
        fireEvent.click(getByTestId(testId));
      });

      await act(() => expect(getByText(currentView)).toBeInTheDocument());
    });
  });
  
  test.skip("show the 'Continue' label to continue the Quiz", () => {
    const updatedState = {
      ...initialState,
      globalStates: {
        ...initialState.globalStates,
        index: 1,
      },
    };
    const { getByText } = RenderWithCustomValue(<Main />, updatedState);
    expect(getByText('Continue')).toBeInTheDocument();
  });

  test.skip("Click the 'Get Started' button and goto first Question", () => {
    const { getByText, getByTestId } = RenderWithCustomValue(<Main />);
    expect(getByText('Get Started')).toBeInTheDocument();
    
    hookAct(() => {
      fireEvent.click(getByTestId('continue'));
    });
  });

});

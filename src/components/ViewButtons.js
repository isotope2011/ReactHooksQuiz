import React, { useCallback, useContext } from "react";
import { StoreContext } from "../context/store/storeContext";

export default () => {
  const { actions } = useContext(StoreContext);
  const onClick = useCallback((event) => {
    actions.viewActions.updateView(event.target.value);
  });

  return (
    <div>
      <hr />
      <button {...{ onClick, value: "Welcome", "data-testid": "Welcome-view" }}>Welcome</button>
      <button {...{ onClick, value: "Summary", "data-testid": "Summary-view" }}>Summary</button>
      <button {...{ onClick, value: "HelloWorld", "data-testid": "HelloWorld-view" }}>Hello World</button>
      <button {...{ onClick, value: "Counter", "data-testid": "Counter-view" }}>Counter</button>
      <button {...{ onClick, value: "Form", "data-testid": "Form-view" }}>React Hook Form</button>
      <button {...{ onClick, value: "YUPForm", "data-testid": "YUPForm-view" }}>YUP Form</button>
      <button {...{ onClick, value: "ConfigForm", "data-testid": "ConfigForm-view" }}>Config Form</button>
      <hr />
    </div>
  );
};

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
      <button {...{ onClick, value: "Welcome" }}>Welcome</button>
      <button {...{ onClick, value: "HelloWorld" }}>Hello World</button>
      <button {...{ onClick, value: "Counter" }}>Counter</button>
      <button {...{ onClick, value: "Form" }}>React Hook Form</button>
      <button {...{ onClick, value: "YUPForm" }}>YUP Form</button>
      <button {...{ onClick, value: "ConfigForm" }}>Config Form</button>
      <hr />
    </div>
  );
};

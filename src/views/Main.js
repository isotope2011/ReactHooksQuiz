import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store/storeContext";
import { ViewButtons } from "../components";
import Error from "./Error";
import useRequest from "../hooks/use-request";

const DEFAULT_VIEW = 'Welcome';
const GET = "GET";

export default () => {
  const { state, actions } = useContext(StoreContext);
  const [errors, setError] = useState(null);
  const PageView = state.viewStates.pageView;
  const doRequest = useRequest({
    url: "/api/quiz",
    method:  GET,
  });
  
  useEffect(() => {
    doRequest().then(({ data, error }) => {
      if (data) {
        actions.globalActions.updateData(data.quizlist);
        actions.viewActions.updateView(DEFAULT_VIEW);   
      } else {
        setError(error.message);
      }
    })
  }, []);
  
  return (
    <div>
      <h2>
        {`Current View: - ${JSON.stringify(state.viewStates.view)}`}
      </h2>
      <ViewButtons />
      {PageView && <PageView data-testid="pageview" />}
      {errors && <Error {...{ errors }} />}
    </div>
  );
};

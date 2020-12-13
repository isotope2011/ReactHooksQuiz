import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store/storeContext";
import { ViewButtons } from "../components";
import Error from "./Error";
import useRequest from "../hooks/use-request";

const DEFAULT_VIEW = 'Welcome';
const GET = "GET";

export default () => {
  const { state, actions } = useContext(StoreContext);
  const [fetched, setFetched] = useState(false);
  const { doRequest, errors } = useRequest({
    url: "/api/quiz",
    method:  GET,
  });
  const { viewStates } = state;
  const { viewActions, globalActions } = actions;
  const PageView = viewStates.pageView;

  useEffect(() => {
    if (!fetched) {
      doRequest().then((data) => {
        setFetched(true);
        if (data) {
          globalActions.updateData(data.quizlist);
          viewActions.updateView(DEFAULT_VIEW);
          
        }
      });
    }
  });

  return (
    <div>
      {`Current View: - ${JSON.stringify(viewStates.view)}`}
      <ViewButtons />
      {PageView && <PageView />}
      {errors && <Error {...{ errors }} />}
    </div>
  );
};

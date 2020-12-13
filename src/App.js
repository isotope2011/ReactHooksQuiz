import React from "react";
import Main from "./views/Main";
import makeServer from "./mock/server";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const App = () => {
  return <Main />;
};

export default App;

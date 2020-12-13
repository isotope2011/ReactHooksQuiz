import React from "react";

export default ({ errors }) => {
  return (
    <>
      {errors ? (
        <div style={{ color: "red" }}>{errors}</div>
      ) : (
        <div>Something went wrong...</div>
      )}
    </>
  );
};

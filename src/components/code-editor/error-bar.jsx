import React from "react";
import EditorContext from "./provider";

const errStyle = {
  color: "red",
  backgroundColor: "blanchedalmond",
  paddingLeft: "2vw",
  height: "fit-content",
};

const ErrorBar = () => {
  const { err } = React.useContext(EditorContext);
  return (
    <div
      data-cy="error-bar"
      style={
        err
          ? errStyle
          : {
            display: "none",
          }
      }
    >
      {err}
    </div>
  )
};

export default ErrorBar;
import React from "react";
import PropTypes from "prop-types";

const errStyle = {
  color: "red",
  backgroundColor: "blanchedalmond",
  paddingLeft: "2vw",
  height: "fit-content",
};

const ErrorBar = ({ errorMessage, ...props }) => (
  <div
    style={
      errorMessage
        ? errStyle
        : {
            display: "none",
          }
    }
  >
    {errorMessage}
  </div>
);

ErrorBar.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorBar.defaultProps = {
  errorMessage: "",
};

export default ErrorBar;

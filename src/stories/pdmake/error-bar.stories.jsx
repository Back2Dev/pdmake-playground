import React from "react";
import ErrorBar from "../../components/error-bar";

export default {
  title: "pdmake/ErrorBar",
  component: ErrorBar,
};

const Template = (args) => <ErrorBar {...args} />;

export const ErrDisplay = Template.bind({});

ErrDisplay.args = {
  errorMessage: "Error message",
};

export const ErrDisplayNone = Template.bind({});

ErrDisplay.args = {
  errorMessage: "",
};

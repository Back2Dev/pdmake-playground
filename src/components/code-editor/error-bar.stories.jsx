import React from "react";
import ErrorBar from "./error-bar";
import { EditorProvider } from "../provider";
import '../index.css'

export default {
  title: "pdmake/ErrorBar",
  component: ErrorBar,
};

const Template = (args) => {
  return (
    <EditorProvider {...args}>
      <ErrorBar />;
    </EditorProvider>
  )
}

export const ErrDisplay = Template.bind({});

ErrDisplay.args = {
  source: "Error message",
};

export const ErrDisplayNone = Template.bind({});

ErrDisplayNone.args = {
  source: "",
};

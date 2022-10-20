import React from "react";
import Playground from "./index";
import { EditorProvider } from "./provider";
import './index.css';

export default {
  title: "pdmake/Playground",
  component: Playground,
};

const Template = (args) => {
  return (
    <EditorProvider {...args} >
      <Playground />
    </EditorProvider>
  )
}

export const Playground1 = Template.bind({});

Playground1.args = {
  source: "dd = {content: ['Hello world']}",
};

export const Playground2 = Template.bind({});

Playground2.args = {
  source: "dd = {content: ['Hello there']}",
};
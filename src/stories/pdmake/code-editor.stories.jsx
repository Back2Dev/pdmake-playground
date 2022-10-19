import React from "react";
import CodeEditor from "../../components/code-editor";
import { EditorProvider } from "../../components/provider";
import '../../index.css';

export default {
  title: "pdmake/CodeEditor",
  component: CodeEditor,
};

const Template = (args) => {
  return (
    <EditorProvider {...args} >
      <CodeEditor />
    </EditorProvider>
  )
}

export const Editor = Template.bind({});

Editor.args = {
  source: "dd = {content: ['Hello world']}",
};

export const Editor1 = Template.bind({});

Editor1.args = {
  source: "dd = {content: ['Hello there']}",
};


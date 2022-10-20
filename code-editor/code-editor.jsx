import React from 'react'
import EditorContext from "../src/components/code-editor-playground/provider";
import TextEditor from "./text-editor";
import CodeMirror from './code-mirror';
import ErrorBar from './error-bar';
import FormatCode from './format-code';

const CodeEditor = () => {
  const { editor, err } = React.useContext(EditorContext);
  return (
    <>
      {editor && <CodeMirror />}
      {!editor && <TextEditor />}
      {err && <ErrorBar />}
      <FormatCode />
    </>
  )
}

export default CodeEditor
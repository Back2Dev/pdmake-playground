import React from "react";
import EditorContext from "./provider";
import TextEditor from "./text-editor";
import ErrorBar from "./error-bar";
import FormatCode from "./format-code";
import { Editor } from "./code-mirror";

const CodeEditor = () => {
  const { editor, err, code, setCode } = React.useContext(EditorContext);

  return (
    <>
      {editor && <Editor onChange={(e) => setCode(e.target.value)} />}
      {false && <div className="cm-editor" />}
      {!editor && <TextEditor />}
      {err && <ErrorBar />}
      <FormatCode />
    </>
  );
};

export default CodeEditor;

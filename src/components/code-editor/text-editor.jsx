import React, { useRef } from "react";
import EditorContext from "./provider";

const TextEditor = () => {
  const { code, setCode } = React.useContext(EditorContext);
  const taRef = useRef(null);
  return (
    <>
      <textarea
        className="text-editor"
        ref={taRef}
        id="textarea"
        name="textarea"
        data-cy="typeinarea"
        style={{ width: "100%" }}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      >
        {code}
      </textarea>
    </>
  );
};

export default TextEditor;

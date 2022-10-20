import React, { useRef } from 'react'
import EditorContext from "../provider";

const TextEditor = () => {
  const { code } = React.useContext(EditorContext);
  const taRef = useRef(null);
  return (
    <>
      <textarea
        className="cm-editor"
        ref={taRef}
        id="textarea"
        name="textarea"
        data-cy="typeinarea"
        style={{ width: "100%" }}
      >
        {code}
      </textarea>
    </>
  )
}

export default TextEditor
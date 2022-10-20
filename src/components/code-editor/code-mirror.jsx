import React, { useRef } from 'react';
import CodeMirrorComp from "@uiw/react-codemirror";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { javascript } from "@codemirror/lang-javascript";
import EditorContext from "../provider";



const CodeMirror = () => {

  const { darktheme, code, setCode } = React.useContext(EditorContext);
  const theme = darktheme ? xcodeDark : xcodeLight;
  const cmRef = useRef(null);

  return (
    <>
      <CodeMirrorComp
        value={`${code}`}
        ref={cmRef}
        onChange={(val) => setCode(val)}
        extensions={[javascript({ jsx: true })]}
        basicSetup={{
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
          lintKeymap: true,
        }}
        theme={theme}
      />
    </>
  )
}

export default CodeMirror
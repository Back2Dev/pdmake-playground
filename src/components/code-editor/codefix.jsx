import React from "react";
import { Grid, Button } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { historyField } from "@codemirror/commands";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import stringifyObject from "stringify-object";

const stateFields = { history: historyField };

// chlick the button to fomat to PDF
const clickFormatButton = () => {
  const value = localStorage.getItem("myValue") || "";
  // const docDefinition = value.split('=')[1].replace(/'/g, `"`).replace(/([{,]\s*)(\S+)\s*(:)/mg, '$1"$2"$3');
  // const docDefinition = JSON.stringify(value.replace("var dd = ", ''), null, "\t");
  let dd = {};
  const docDefinition = stringifyObject(value, { indent: "  " });

  // let docDefinition = {
  //   header: 'C#Corner PDF Header',
  //   content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
  // };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getDataUrl((dataUrl) => {
    const targetElement = document.getElementById("pdfView");
    targetElement.src = dataUrl;
  });
};

const CodeEditor = () => {
  const serializedState = localStorage.getItem("myEditorState");
  const value = localStorage.getItem("myValue") || "";

  return (
    <>
      <Grid container spacing={0} sx={{ width: "100%", height: "100%" }}>
        <Grid item sm={12} md={6}>
          <CodeMirror
            value={value}
            height="80vh"
            initialState={
              serializedState
                ? {
                    json: JSON.parse(serializedState || ""),
                    fields: stateFields,
                  }
                : undefined
            }
            onChange={(value, viewUpdate) => {
              // clickFormatButton();
              // console.log(stringifyObject(value, { indent: '  ' }));
              // console.log(CodeMirror.getValue());
              let dd;
              try {
                dd = eval(value);
              } catch (e) {
                console.error(e);
              }
              console.log(value, dd);
              localStorage.setItem("myValue", value);
              const state = viewUpdate.state.toJSON(stateFields);
              localStorage.setItem("myEditorState", JSON.stringify(state));
            }}
            extensions={[javascript({ jsx: true })]}
            basicSetup={{
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false,
              lintKeymap: true,
            }}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <iframe
            id="pdfView"
            src=""
            width="100%"
            height="100%"
            border="0"
          ></iframe>
        </Grid>
      </Grid>
      <Button onClick={clickFormatButton}>Format</Button>
    </>
  );
};

export default CodeEditor;

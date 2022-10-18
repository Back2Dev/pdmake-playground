import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import Split from "react-split";
import { debounce } from "lodash";
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CodeMirror from "@uiw/react-codemirror";

import { javascript } from "@codemirror/lang-javascript";
import { historyField } from "@codemirror/commands";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import EditorContext from "./provider";
import ErrorBar from "./error-bar";

const stateFields = { history: historyField };

const CodeEditor = (props) => {
  const { code, setCode } = React.useContext(EditorContext);
  const serializedState = localStorage.getItem("myEditorState");
  const [err, setErr] = useState("");
  const [theme, setTheme] = useState(xcodeDark);
  const [value, setValue] = useState("dd = { content : ['Hello','World']} ");
  const [useCM, setUseCM] = useState(true);
  const taRef = useRef(null);
  const cmRef = useRef(null);
  const selectTheme = (event) => {
    if (event.target.value === "dark") {
      setTheme(xcodeDark);
    } else if (event.target.value === "light") {
      setTheme(xcodeLight);
    }
  };
  let dd = {};
  const makePdf = () => {
    try {
      console.log("code type: ", typeof code);
      const docDefinition = eval(code);
      console.log("docDefinition: ", docDefinition);
      console.log("docDefinition type: ", typeof docDefinition);
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.getElementById("pdfView");
        targetElement.src = dataUrl;
        setErr("");
      });
    } catch (e) {
      console.log("error message: ", e);
      setErr(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    makePdf();
  }, []);

  const handleChange = (val, viewUpdate) => {
    // setValue(val);
    setCode(val);
    // localStorage.setItem("myValue", value.replace("var dd", "dd"));
    // const state = viewUpdate.state.toJSON(stateFields);
    // localStorage.setItem("myEditorState", JSON.stringify(state));
    makePdf();
  };

  const debouncedOnChange = debounce(handleChange, 1000);

  const formatCode = () => {
    const formatted = prettier.format(code, {
      useTabs: false,
      printWidth: 90,
      tabWidth: 2,
      singleQuote: true,
      semi: false,
      parser: "babel",
      plugins: [babelParser],
    });
    console.log({ formatted });
    setCode(formatted);
    // const cm = cmRef.current.codeMirrorInstance;
    // debugger;
    // cm.setValue(formatted);
  };

  const toggleEditor = () => {
    setUseCM(!useCM);
  };

  return (
    <>
      <Grid container columns={12} className="main-area">
        <Box width="100vw">
          <Split className="split">
            <Grid item columns={1}>
              <Box
                sx={{ bgcolor: "#2a313e", height: "10vh", color: "#ffffff" }}
              >
                {useCM && (
                  <CodeMirror
                    value={`${code}`}
                    ref={cmRef}
                    height="80vh"
                    onChange={debouncedOnChange}
                    extensions={[javascript({ jsx: true })]}
                    basicSetup={{
                      dropCursor: false,
                      allowMultipleSelections: false,
                      indentOnInput: false,
                      lintKeymap: true,
                    }}
                    theme={theme}
                  />
                )}
                <ErrorBar errorMessage={err} data-cy="errorbar" />
                {!useCM && (
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
                )}
                <FormGroup>
                  <Button
                    onClick={formatCode}
                    data-cy="format"
                    variant="outlined"
                  >
                    Format
                  </Button>
                  <FormControlLabel
                    control={<Switch checked={useCM} />}
                    onChange={toggleEditor}
                    label="use Code Mirror"
                  />
                </FormGroup>{" "}
              </Box>
            </Grid>
            <Grid item columns={1}>
              <Box
                sx={{ bgcolor: "#cccccc", height: "80vh", color: "#FFFFFF" }}
                id="iframeContainer"
              >
                <iframe
                  id="pdfView"
                  src=""
                  width="100%"
                  height="100%"
                  border="0"
                ></iframe>
              </Box>
              <div>
                <Button onClick={makePdf} data-cy="updatepdfbutton">
                  Update PDF
                </Button>
                <ToggleButtonGroup
                  exclusive={true}
                  className="MuiToggleButtonGroup-groupedHorizontal theme-selector"
                >
                  <ToggleButton
                    value="dark"
                    onClick={selectTheme}
                    aria-label="Dark-theme"
                  >
                    Dark
                  </ToggleButton>
                  <ToggleButton
                    value="light"
                    onClick={selectTheme}
                    aria-label="Light-theme"
                  >
                    Light
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Grid>
          </Split>
        </Box>
      </Grid>
    </>
  );
};

export default CodeEditor;

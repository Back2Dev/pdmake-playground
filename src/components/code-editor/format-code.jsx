import React from "react";
import EditorContext from "./provider";
import { FormGroup, Button } from "@mui/material";
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";

const FormatCode = () => {
  const { code, setCode } = React.useContext(EditorContext);
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
    console.log("formatted:", formatted);
    setCode(formatted);
  };
  return (
    <>
      <FormGroup>
        <Button
          onClick={formatCode}
          data-cy="format"
          variant="outlined"
          style={{ margin: "0px", padding: "0px", height: "20px" }}
        >
          Format
        </Button>
      </FormGroup>
    </>
  );
};

export default FormatCode;

import React from "react";
import { Button, MenuItem } from "@mui/material";
import EditorContext from "./provider";

const PdfOptions = () => {
  const { code, setCode } = React.useContext(EditorContext);
  let dd;
  const buttonStyle = {
    my: 2,
    color: "inherit",
    fontWeight: "bold",
    fontSize: "0.65rem",
  };

  return (
    <>
      <MenuItem>
        <Button
          variant="text"
          onClick={() => pdfMake.createPdf(eval(code)).open()}
          id="open-pdf"
          sx={buttonStyle}
        >
          OPEN
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          variant="text"
          onClick={() => pdfMake.createPdf(eval(code)).print()}
          id="print-pdf"
          sx={buttonStyle}
        >
          PRINT
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          variant="text"
          onClick={() => pdfMake.createPdf(eval(code)).download()}
          id="download-pdf"
          sx={buttonStyle}
        >
          DOWNLOAD
        </Button>
      </MenuItem>
    </>
  );
};

export default PdfOptions;

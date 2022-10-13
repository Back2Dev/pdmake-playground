import React from "react";
import { Box, Button } from "@mui/material";
import EditorContext from "../context/provider";
import basics from "./basics";
import styles1 from "./styles1";
import styles2 from "./styles2";

const SampleFiles = () => {
  const samples = {
    BASICS: basics,
    STYLE1: styles1,
    STYLE2: styles2,
    // "STYLE3",
    // "COLUMNS",
    // "TABLES",
    // "LISTS",
    // "MARGIN",
    // "IMAGES",
  };
  const { code, setCode } = React.useContext(EditorContext);
  console.log({ code });

  const openDoc = (e) => {
    console.log(`Loading ${e.target.value}`);
    setCode(samples[e.target.value]);
  };
  return (
    <>
      <Box mr="15px" id="pdf-options" fontWeight="bold" marginRight="4rem">
        {Object.keys(samples).map((sample) => {
          return (
            <Button
              key={sample}
              value={sample}
              variant="text"
              onClick={openDoc}
              sx={{
                my: 2,
                color: "white",
                fontWeight: "bold",
                fontSize: "0.65rem",
              }}
            >
              {sample}
            </Button>
          );
        })}
      </Box>
    </>
  );
};

export default SampleFiles;

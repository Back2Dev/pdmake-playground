import React from "react";
import { Button, MenuItem } from "@mui/material";
import EditorContext from "./provider";

// import sample files
import basics from "./sample-files/basics";
import styles1 from "./sample-files/styles1";
import styles2 from "./sample-files/styles2";
import styles3 from "./sample-files/styles3";
import columns from "./sample-files/columns";
import tables from "./sample-files/tables";
import lists from "./sample-files/lists";
import margin from "./sample-files/margin";
import images from "./sample-files/images";

const SampleFiles = () => {
  const samples = {
    BASICS: basics,
    STYLE1: styles1,
    STYLE2: styles2,
    STYLE3: styles3,
    COLUMNS: columns,
    TABLES: tables,
    LISTS: lists,
    MARGIN: margin,
    IMAGES: images,
  };
  const { code, setCode } = React.useContext(EditorContext);
  const { filename, setFilename } = React.useContext(EditorContext);

  const openDoc = (e) => {
    console.log(`Loading ${e.target.value}`);
    setFilename(e.target.value);
    setCode(samples[e.target.value]);
  };

  return (
    <>
      {Object.keys(samples).map((sample) => {
        return (
          <MenuItem key={sample}>
            <Button
              key={sample}
              value={sample}
              variant="text"
              onClick={openDoc}
              sx={{
                my: 2,
                color: "inherit",
                fontWeight: "bold",
                fontSize: "0.65rem",
              }}
            >
              {sample}
            </Button>
          </MenuItem>
        );
      })}
    </>
  );
};

export default SampleFiles;

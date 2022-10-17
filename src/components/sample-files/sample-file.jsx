import React from "react";
import { Box, Button, MenuItem } from "@mui/material";
import EditorContext from "../context/provider";
import basics from "./basics";
import styles1 from "./styles1";
import styles2 from "./styles2";
import styles3 from "./styles3";
import columns from "./columns";
import tables from "./tables";
import lists from "./lists";
import margin from "./margin";
import images from "./tables";

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
  // console.log("code:", { code });

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

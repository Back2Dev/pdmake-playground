import React from "react";
import { Button, MenuItem } from "@mui/material";
import EditorContext from "../provider";

// import sample files
import basics from "../../../public/sample-files/basics";
import styles1 from "../../../public/sample-files/styles1";
import styles2 from "../../../public/sample-files/styles2";
import styles3 from "../../../public/sample-files/styles3";
import columns from "../../../public/sample-files/columns";
import tables from "../../../public/sample-files/tables";
import lists from "../../../public/sample-files/lists";
import margin from "../../../public/sample-files/margin";
import images from "../../../public/sample-files/images";

const SampleFiles = (props) => {
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
  const { code, setCode, setDirty } = React.useContext(EditorContext);
  const { filename, setFilename } = React.useContext(EditorContext);

  const [loadingstate, setLoadingState] = React.useState(false);

  const loading = () => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const openDoc = (e) => {
    console.log(`Loading ${e.target.value}`);
    setFilename(e.target.value);
    setCode(samples[e.target.value]);
    setDirty(true);
    loading();
  };

  return (
    <>
      {Object.keys(samples).map((sample) => {
        return (
          <MenuItem
            key={sample}
            onClick={props.handleCloseNavMenu}
            style={{ minHeight: "5vh", maxHeight: "5vh" }}
          >
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
              data-cy={sample}
              disabled={loadingstate}
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

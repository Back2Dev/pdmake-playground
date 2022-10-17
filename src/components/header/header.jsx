import React from "react";
import { Box } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Link } from "react-router-dom";
import "./header.css";
import PdfOptions from "../pdf-options/pdf-options";
import SampleFiles from "../sample-files/sample-file";
import EditorContext from "../context/provider";


const pages = [
  "BASICS",
  "STYLE1",
  "STYLE2",
  "STYLE3",
  "COLUMNS",
  "TABLES",
  "LISTS",
  "MARGIN",
  "IMAGES",
];

const files = ["new file", "save", "list"];

const Header = () => {

  const { code, setCode } = React.useContext(EditorContext);
  const { filename, setFilename } = React.useContext(EditorContext);
  // const gstate = React.useContext(globalStateContext);
  // set the name of the opened file
  const [filenametag, setFilenametag] = React.useState("File Name");

  const [anchorfile, setAnchorfile] = React.useState(null);

  const handleOpenfile = (event) => {
    setAnchorfile(event.currentTarget);
  };

  const handleClosefile = (event) => {
    setFilename(event.target.innerText);
    // gstate.filename = event.target.innerText;
    // console.log(gstate.filename);
    setAnchorfile(null);
  };

  // menu states
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setFilenametag(event.target.value);
    // gstate.filename = event.target.value;
    // console.log(gstate.filename);
    setAnchorElNav(null);
  };

  const handleOpenSample = (event) => {
    setAnchorElNav(null);
  };

  return (
    <div className="header">
      <div className="header_logo">
        <a href="/">Back2dev</a>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0 }} ml="15px">
              <Tooltip title="Open File">
                <Button
                  size="large"
                  onClick={handleOpenfile}
                  color="inherit"
                  variant="text"
                >
                  <FileOpenIcon />
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorfile}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorfile)}
                onClose={handleClosefile}
              >
                {files.map((file) => (
                  <MenuItem key={file} onClick={handleClosefile}>
                    <Typography textAlign="center">{file}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {false &&
                  pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={handleOpenSample}
                      value={page}
                      sx={{
                        my: 2,
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.65rem",
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <SampleFiles />
              {false &&
                pages.map((page) => (
                  <Button
                    key={page}
                    value={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    variant="text"
                  >
                    {page}
                  </Button>
                ))}
            </Box>
            <PdfOptions />
            <Box mr="15px" id="filename" fontWeight="bold">
              {filename}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;

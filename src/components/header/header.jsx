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
import { globalStateContext } from "../context/provider";

const pages = ["New"];

const files = [
  "basics",
  "columns",
  "inline-styling",
  "lists",
  "margins",
  "named-styles",
  "style-overrides",
  "tables",
];

const Header = () => {
  const state = React.useContext(globalStateContext);
  // set the name of the opened file
  const [filenametag, setFilenametag] = React.useState("File Name");

  const [anchorfile, setAnchorfile] = React.useState(null);

  const handleOpenfile = (event) => {
    setAnchorfile(event.currentTarget);
  };

  const handleClosefile = (event) => {
    setFilenametag(event.target.innerText);
    state.filename = event.target.innerText;
    console.log(state.filename);
    setAnchorfile(null);
  };

  // menu states
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  variant="text"
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box mr="15px" id="filenametag" fontWeight="bold">
              {filenametag}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;

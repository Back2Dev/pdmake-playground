import React from "react";
// MUI
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
// Components
import PdfOptions from "./pdf-options";
import SampleFiles from "./sample-file";
import EditorContext from "./provider";
import Settings from "./settings";

const Header = () => {
  const files = ["new file", "save", "list"];

  const { filename, setFilename } = React.useContext(EditorContext);
  const [anchorfile, setAnchorfile] = React.useState(null);

  const handleOpenfile = (event) => {
    setAnchorfile(event.currentTarget);
  };

  const handleClosefile = (event) => {
    setFilename(event.target.innerText);
    setAnchorfile(null);
  };

  // menu states
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElPdf, setAnchorElPdf] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setFilename(event.target.value);
    setAnchorElNav(null);
  };
  const handleOpenPdfMenu = (event) => {
    setAnchorElPdf(event.currentTarget);
  };

  const handleClosePdfMenu = (event) => {
    setAnchorElPdf(null);
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
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "flex", md: "none" },
                  direction: "column",
                  color: "inherit",
                  my: 2,
                }}
              >
                <SampleFiles />
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <SampleFiles />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="pdf-options"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenPdfMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="pdf-menu-appbar"
                anchorEl={anchorElPdf}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElPdf)}
                onClose={handleClosePdfMenu}
                sx={{
                  display: { xs: "flex", md: "flex", lg: "none" },
                  direction: "column",
                  color: "inherit",
                  my: 2,
                }}
              >
                <PdfOptions />
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "none", lg: "flex" },
              }}
            >
              <PdfOptions />
            </Box>
            <Box mr="15px" id="filename" fontWeight="bold">
              {filename}
            </Box>
            <Box mr="15px" fontWeight="bold">
              <Settings />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;

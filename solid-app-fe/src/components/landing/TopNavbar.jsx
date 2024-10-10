import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Button,
} from "@mui/material";
import LoginModel from "../login/login.jsx";
import Register from "../register/Register.jsx";
import { useState } from "react";
import logo from "../../icons/logo.svg";
import { styled } from "@mui/material/styles";
import { navBar } from "./navbar-style.jsx";

TopNavbar.defaultProps = {
  open: false,
};

function TopNavbar() {
  const [open, setOpen] = useState(false);
  const [openreg, setOpenreg] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpenreg(true);
  const handleClose2 = () => setOpenreg(false);

  const MainButton = styled(Button)({
    height: "56px",
    width: "129px",
    borderRadius: "15px",
    textTransform: "capitalize",
    marginRight: "24px",
    boxShadow: "none",
    backgroundColor: "black",
  });
  const SecondButton = styled(Button)({
    height: "56px",
    width: "129px",
    borderRadius: "15px",
    textTransform: "capitalize",
    borderColor: "black",
    color: "black",
    boxShadow: "none",
  });

  return (
    <>
      <AppBar position="static" sx={navBar}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={logo} alt="" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGo
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {" "}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <MainButton variant="contained" onClick={handleOpen}>
                Login
              </MainButton>
              <SecondButton variant="outlined" onClick={handleOpen2}>
                Register
              </SecondButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginModel open={open} handleClose={handleClose} />
      <Register open={openreg} handleClose={handleClose2} />
    </>
  );
}
export default TopNavbar;

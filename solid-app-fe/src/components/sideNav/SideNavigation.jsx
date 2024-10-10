import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import logo from "../../icons/logo.svg";
import logoDark from "../../icons/logoDark.svg";
import logout from "../../icons/logout.svg";
import logoutDark from "../../icons/logoutDark.svg";
import home from "../../icons/homeIcon.svg";
import homeDark from "../../icons/homeDark.svg";
import group from "../../icons/group.svg";
import groupDark from "../../icons/groupDark.svg";
import settings from "../../icons/settings.svg";
//import profile from "../../icons/profile01.svg";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction, checkLoggedIn } from "../../redux/actions/index.js";
//import { profiles } from "../Group/profilesArray.js";
import { setDarkMode } from "../../redux/actions/index.js";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function NavBar(props) {
  const dispatch = useDispatch();
  //const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
  const user = useSelector((state) => state.user.UserData);
  //const [darkMode, setDarkMode] = React.useState(false);
  const darkMode = useSelector((state) => state.user.darkMode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const NavBarBox = styled(Box)({
    minHeight: "3§50px",
    backgroundColor: darkMode ? "#000" : "#FFFFFF",
    borderRadius: "20px",
  });
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 2,
      top: 25,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  console.log("darkMode", darkMode);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBarBox>
        <Box
          sx={{
            height: "100%",
            padding: "37px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              component={Link}
              to="/"
              src={darkMode ? logoDark : logo}
              alt=""
            />
          </Box>
          <Box sx={{ marginBlock: "30px" }}>
            <Button
              component={NavLink}
              to="/home"
              activeclassname="active"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                textTransform: "capitalize",
                width: "200px",
                height: "50px",
              }}
              onClick={() => {
                dispatch(checkLoggedIn(user._id));
              }}
            >
              <img src={darkMode ? homeDark : home} alt="" />
              <Typography sx={{ fontSize: "16px", marginInlineStart: "10px" }}>
                Home
              </Typography>
            </Button>

            <StyledBadge
              badgeContent={props.user.group.length}
              color="primary"
              sx={{ color: "#fff" }}
            >
              <Button
                component={NavLink}
                to="/group"
                activeclassname="active"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  textTransform: "capitalize",
                  width: "200px",
                  height: "50px",
                }}
                onClick={() => {
                  dispatch(checkLoggedIn(user._id));
                }}
              >
                <img src={darkMode ? groupDark : group} alt="" />
                <Typography
                  sx={{ fontSize: "16px", marginInlineStart: "10px" }}
                >
                  Group
                </Typography>
              </Button>
            </StyledBadge>

            <Accordion
              sx={{
                boxShadow: "none",
                backgroundColor: darkMode ? "#000" : "#fff",
                color: darkMode ? "#767676" : "#767676",
                minHeight: "45px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: darkMode ? "#767676" : "#767676" }}
                  />
                }
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{
                  paddingInline: "0",
                  paddingInlineStart: "10px",
                  height: "30px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textTransform: "capitalize",
                  }}
                >
                  <img src={darkMode ? settings : settings} alt="" />
                  <Typography
                    sx={{ fontSize: "16px", marginInlineStart: "10px" }}
                  >
                    Settings
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: darkMode ? "black" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  padding: "0",
                  paddingInlineStart: "20px",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(setDarkMode(!darkMode));
                  }}
                  sx={{ fontSize: "14px" }}
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </MenuItem>
              </AccordionDetails>
              <AccordionDetails
                sx={{
                  backgroundColor: darkMode ? "black" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  padding: "0",
                  paddingInlineStart: "20px",
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(logOutAction());
                  }}
                  sx={{ fontSize: "14px" }}
                >
                  Logout
                </MenuItem>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Avatar
              {...stringAvatar(
                `${props.user.firstName} ${props.user.lastName}`
              )}
              className={darkMode ? "upper-caseDark" : "upper-case"}
            />
            <Typography
              sx={{
                fontSize: "18px",
                marginInlineStart: "10px",
                textTransform: "capitalize",
              }}
            >
              <span>{props.user.firstName}</span>{" "}
              <span>{props.user.lastName}</span>
              <Typography sx={{ fontSize: "13px", textTransform: "lowercase" }}>
                <span>{props.user.email}</span>
              </Typography>
            </Typography>
          </Box>
        </Box>
      </NavBarBox>
    </Box>
  );
}

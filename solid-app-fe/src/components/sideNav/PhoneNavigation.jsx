import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Avatar, Badge, BottomNavigation } from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import home from "../../icons/homeIcon.svg";
import group from "../../icons/group.svg";
//import profile from "../../icons/profile01.svg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction, checkLoggedIn } from "../../redux/actions/index.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { setDarkMode } from "../../redux/actions/index.js";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 25,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
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

export default function PhoneNavigation(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.UserData);
  const darkMode = useSelector((state) => state.user.darkMode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f8f8f8",
        zIndex: 1,
      }}
    >
      <BottomNavigation sx={{ backgroundColor: darkMode ? "black" : "" }}>
        <BottomNavigationAction
          icon={<img src={home} alt="Home" />}
          component={NavLink}
          to="/home"
          onClick={() => {
            dispatch(checkLoggedIn(user._id));
          }}
          sx={{ maxWidth: "100px" }}
        />
        <StyledBadge badgeContent={props.user.group.length} color="primary">
          <BottomNavigationAction
            label="Group"
            icon={<img src={group} alt="Group" />}
            component={NavLink}
            to="/group"
            onClick={() => {
              dispatch(checkLoggedIn(user._id));
            }}
            sx={{ maxWidth: "100px" }}
          />
        </StyledBadge>
        <BottomNavigationAction
          icon={
            <Avatar
              {...stringAvatar(
                `${props.user.firstName} ${props.user.lastName}`
              )}
            />
          }
          sx={{ maxWidth: "100px" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              dispatch(setDarkMode(!darkMode));
            }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </MenuItem>

          <MenuItem
            onClick={() => {
              dispatch(logOutAction());
              handleClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </BottomNavigation>
    </Box>
  );
}

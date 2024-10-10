import React from "react";

import { Typography, Box, Slide } from "@mui/material";
import slide03 from "../../icons/slide03.svg";
import { NavLink } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
//import { getUserData } from "../../redux/actions";
import { MainButton } from "./getStartedStyle.jsx";

const GetStarted03 = () => {
  // const dispatch = useDispatch();
  // const AddeduserId = useSelector((state) => state.user.addedUser._id);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#008A93",
        }}
      >
        <Slide
          direction="left"
          in={true}
          timeout={900}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <img src={slide03} alt="" style={{ width: "30em" }} />
          </Box>
        </Slide>
        <Slide
          direction="left"
          in={true}
          timeout={1300}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1.5em",
                marginBlockEnd: "50px",
                width: "20em",
                textAlign: "center",
              }}
            >
              Simplicity, Minimal and Free as to ensure your best experience.
            </Typography>
          </Box>
        </Slide>
        <Box sx={{ marginBlockEnd: "20px" }}>
          <MainButton
            sx={{ width: "400px", color: "#fff" }}
            fullWidth
            LinkComponent={NavLink}
            to="/home"
            variant="contained"
            color="orange"
            type="submit"
          >
            Get Started
          </MainButton>
        </Box>
      </Box>
    </>
  );
};

export default GetStarted03;

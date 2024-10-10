import { Box, Container, Grid, Fade, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideNavigation from "../sideNav/SideNavigation.jsx";
import Group from "../Group/Group.jsx";
import { useSelector, useDispatch } from "react-redux";
import { checkLoggedIn } from "../../redux/actions/index.js";
import PhoneNavigation from "../sideNav/PhoneNavigation.jsx";

function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.UserData);
  const userID = useSelector((state) => state.user.addedUser._id);

  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    dispatch(checkLoggedIn(userID));

    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setWelcome(true);
      localStorage.setItem("hasVisitedBefore", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setTimeout(() => {
    setWelcome(false);
  }, 3000);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ marginBlockStart: "30px" }}
      >
        <Grid item xs={3}>
          <Box
            sx={{
              position: "sticky",
              top: "20px",
              "@media (max-width: 1137px)": {
                display: "none",
              },
            }}
          >
            {user && <SideNavigation user={user} />}
          </Box>
          <Box
            sx={{
              visibility: "hidden",
              "@media (max-width: 1137px)": {
                visibility: "visible",
              },
            }}
          >
            <PhoneNavigation user={user} />
          </Box>
        </Grid>
        <Fade in={true} timeout={1000}>
          <Grid item xs={12} md={9}>
            {<Group user={user} />}
          </Grid>
        </Fade>
      </Grid>
      {welcome && (
        <Fade in={true} timeout={700}>
          <Alert
            variant="filled"
            severity="success"
            color="primary"
            sx={{
              borderRadius: "15px",
              position: "absolute",
              bottom: "20px",
              textAlign: "center",
            }}
          >
            Welcome Back {user.firstName}
          </Alert>
        </Fade>
      )}
    </Container>
  );
}

export default Account;

import { Box, Container, Grid, Fade } from "@mui/material";
import React from "react";
import SideNavigation from "../sideNav/SideNavigation.jsx";
import Groupcards from "./Groupcards.jsx";
import { useSelector } from "react-redux";
import PhoneNavigation from "../sideNav/PhoneNavigation.jsx";

function GroupPage() {
  const user = useSelector((state) => state.user.UserData);
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
          <Grid item md={9} sx={{ transition: "opacity 3s ease-in-out" }}>
            <Groupcards user={user} />
          </Grid>
        </Fade>
      </Grid>
    </Container>
  );
}

export default GroupPage;

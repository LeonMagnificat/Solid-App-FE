import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import empty from "../../icons/empty01.svg";
import add from "../../icons/add.svg";
import CreateGroupModel from "../Group/CreateGroupModel.jsx";
import { useState } from "react";
import GroupPageCards from "./GroupPageCard.jsx";
import { useSelector } from "react-redux";

const GroupBox = styled(Box)({
  height: "400px",
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
});

const AddButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  background: "rgb(224, 155, 45)",
  boxShadow: "none",
});

export default function Groupcards(props) {
  const darkMode = useSelector((state) => state.user.darkMode);
  const group = props.user.group;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [infoText, setInfoText] = useState(false);

  const content = props.user.group.length > 0 ? true : false;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };

  return (
    <>
      {!content ? (
        <Box sx={{ flexGrow: 1 }}>
          <GroupBox sx={{ backgroundColor: darkMode ? "#363636" : "white" }}>
            <Box
              sx={{
                height: "100%",
                padding: "37px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <img src={empty} alt="" />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBlockEnd: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      cursor: "pointer",
                      width: "301px",
                      textAlign: "center",
                      marginBlock: "25px",
                      color: darkMode ? "#fff" : "black",
                    }}
                  >
                    There are no groups available, click the button below to
                    create one and add members.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddButton variant="contained" onClick={handleOpen}>
                  <img className="mr-3" src={add} alt="" /> Create Group
                </AddButton>
              </Box>
            </Box>
          </GroupBox>
          <CreateGroupModel
            open={open}
            handleClose={handleClose}
            user={props.user}
            setMessage={setMessage}
            setInfoText={setInfoText}
          />
        </Box>
      ) : (
        <>{props.user && group && <GroupPageCards />}</>
      )}

      <Snackbar
        open={message}
        autoHideDuration={7000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          sx={{ width: "100%" }}
          color="secondary"
        >
          {infoText}
        </Alert>
      </Snackbar>
    </>
  );
}

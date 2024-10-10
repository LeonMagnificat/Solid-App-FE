import React from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { style } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { deleteUserInGroup } from "../../redux/actions/index.js";
import { useSelector } from "react-redux";

export default function DeleteUserModel(props) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.user.darkMode);
  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
  });

  const MainButton = styled(Button)({
    height: "56px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });

  const groupId = props.groupId;
  const userId = props.user._id;

  const handleDelete = async () => {
    const response = await dispatch(deleteUserInGroup(groupId, userId));
    if (response.ok) {
      props.setMessage(true);
      props.setInfoText(`User was deleted successfully`);
      props.handleClose();
    } else {
      props.setMessage(true);
      props.setInfoText(response.message);
      props.handleClose();
      console.log("error message", response.message);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "551px",
    bgcolor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
    boxShadow: 24,
    borderRadius: "20px",
    paddingInline: "70px",
    paddingBlockEnd: "39px",
    boxSizing: "border-box",
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <ModelTitles
              sx={{ marginBlockEnd: "10px" }}
              variant="h3"
              gutterBottom
            >
              Delete Member
            </ModelTitles>
            <Box
              sx={{
                display: "flex",
                marginInlineEnd: "55px",
                marginBlock: "20px",
              }}
            >
              <Typography sx={{ marginBlock: "8px" }}>
                Are You sure you want to permanently remove{" "}
                <span>{props.user.firstName} </span>
                <span>{props.user.lastName}</span> from the group?
              </Typography>
            </Box>

            <Box>
              <MainButton
                variant="contained"
                size="large"
                color="delete"
                sx={{ color: "#fff" }}
                onClick={() => {
                  handleDelete();
                  props.handleClose();
                }}
              >
                Yes Delete
              </MainButton>
              <Button
                color="delete"
                sx={{ textTransform: "capitalize", marginInlineStart: "30px" }}
                onClick={props.handleClose}
              >
                Do not Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

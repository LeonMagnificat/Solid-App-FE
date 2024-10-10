import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Modal, Fade, Button, Typography, TextField } from "@mui/material";
import { titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../redux/actions/index.js";
import { useSelector } from "react-redux";

export default function AddTaskModel(props) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.user.darkMode);

  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
  });

  const MainButton = styled(Button)({
    height: "56px",
    width: "160px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });

  const [task, setTask] = useState("");
  const groupId = props.groupId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(addNewTask(groupId, task));
    if (response.status) {
      //props.setTasks(response.data.group.map((group) => group.tasks));
      props.setMessage(true);
      props.setInfoText("Task created Successfully");
      props.handleClose();
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
            style: { backgroundColor: "black", opacity: 0.8 },
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <ModelTitles sx={titleStyle} variant="h3" gutterBottom>
              Add a spending
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              <TextField
                className="inputRounded"
                label="Spending Name"
                variant="outlined"
                type="text"
                required
                fullWidth
                InputProps={{
                  style: {
                    color: darkMode ? "white" : "black",
                    borderColor: "#000",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.7)", // sets the border color to a slightly lighter color when hovered with some transparency
                    },
                  },
                }}
                sx={{ marginBlockEnd: "25px" }}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
              />

              <MainButton variant="contained" size="large" type="submit">
                Save
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

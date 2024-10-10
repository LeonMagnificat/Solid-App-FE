import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { style, titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";

export default function LoginModel(props) {
  const InputField = styled(TextField)({
    border: "none",
    borderRadius: "20px",
    // width: "178px",
    height: "56px",
    marginBlockEnd: "23px",
  });

  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
  });

  const MainButton = styled(Button)({
    height: "56px",
    width: "129px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target.value);
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
            timeout: 1000,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <ModelTitles sx={titleStyle} variant="h3" gutterBottom>
              Register
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              <InputField
                className="inputRounded"
                sx={{ width: "193px", marginInlineEnd: "23px" }}
                label="First Name"
                variant="outlined"
                value={message}
                onChange={handleChange}
              />
            </form>

            <MainButton variant="contained" size="large">
              Sign Up
            </MainButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

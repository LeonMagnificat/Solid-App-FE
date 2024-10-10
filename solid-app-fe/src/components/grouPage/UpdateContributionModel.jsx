import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import profile16 from "../../icons/profile16.svg";
import contribution from "../../icons/contribution.svg";
import { style } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addContribution } from "../../redux/actions/index.js";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

export default function UpdateContributionModel(props) {
  const [amount, setAmount] = useState(0);
  const darkMode = useSelector((state) => state.user.darkMode);
  const dispatch = useDispatch();
  const userId = props.user._id;
  const groupId = props.group._id;
  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
  });

  const MainButton = styled(Button)({
    height: "56px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      addContribution(groupId, userId, Number(amount))
    );
    if (response.status) {
      props.setMessage(true);
      props.setInfoText(
        `Contribution added successfully, amount added ${amount}`
      );
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
              Update Member Contribution
            </ModelTitles>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: "55px",
                marginBlock: "20px",
                width: "100%",
              }}
            >
              <img className="avatar-profile" src={profile16} alt="" />
              <Typography
                sx={{ marginInlineStart: "10px", marginInlineEnd: "15px" }}
              >
                {props.user.firstName} {props.user.lastName}{" "}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                sx={{
                  marginInlineStart: "10px",
                  color: "gray",
                  fontSize: "15px",
                }}
              >
                Balance: {props.total} {props.group.currency}{" "}
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ marginBlockEnd: "30px" }}
                className="inputRounded"
                label="Last amount added..."
                variant="outlined"
                fullWidth
                InputProps={{
                  style: {
                    color: darkMode ? "white" : "black",
                    borderColor: "#000",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  if (enteredValue > 0 || enteredValue === "") {
                    setAmount(enteredValue);
                  }
                }}
                type="number"
                inputProps={{ min: "1" }}
                required
              />

              <MainButton variant="contained" size="large" type="submit">
                Update
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

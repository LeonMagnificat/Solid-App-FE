import { Box, Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "551px",

  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  paddingInline: "70px",
  paddingBlockEnd: "39px",
  boxSizing: "border-box",
};

export const titleStyle = {
  fontSize: "2em",
};
export const style2 = {
  position: "absolute",
  top: "50%",
  right: "0px",
  transform: "translate(-50%, -50%)",
  width: "550px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  paddingInline: "70px",
  paddingBlockEnd: "39px",
  boxSizing: "border-box",
};

export const MainButton = styled(Button)({
  height: "56px",
  borderRadius: "20px",
  textTransform: "capitalize",
  padding: "8px 0px",
});
export const ModelTitles = styled(Typography)({
  fontSize: "24px",
  marginBlock: "39px",
});
export const InputField = styled(TextField)({
  border: "none",
  borderRadius: "20px",
  height: "56px",
  marginBlockEnd: "23px",
});

export const GoogleButton = styled(Button)({
  height: "56px",
  borderRadius: "20px",
  backgroundColor: "white",
  color: "black",
  textTransform: "capitalize",
  boxShadow: "none",
  border: "1px solid #D6D6D6",
  marginTop: "15px",
  marginBottom: "30px",
  "&:hover": {
    backgroundColor: "#f4f4f4",
    boxShadow: "none",
  },
});

export const ImageLogin = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "30%",
  width: "70em",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  boxSizing: "border-box",
});

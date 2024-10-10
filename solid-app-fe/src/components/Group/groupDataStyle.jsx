import React from "react";

import { styled } from "@mui/material/styles";
import {
  Button,
  Box,
  TextField,
  FormControl,
  Typography,
  Accordion,
} from "@mui/material";

export const GroupBox = styled(Box)({
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
  padding: "10px",
  boxSizing: "border-box",
});

export const AddButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  boxShadow: "none",
});

export const AddContactButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  boxShadow: "none",
});

export const GroupBox2 = styled(Box)({
  height: "400px",
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
});

export const AddButton2 = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  background: "rgb(224, 155, 45)",
  boxShadow: "none",
});

export const InputField = styled(TextField)({
  border: "none",
  borderRadius: "20px",
  // width: "178px",
  height: "56px",
  marginBlockEnd: "23px",
});
export const SelectField = styled(FormControl)({
  border: "none",
  borderRadius: "20px",
  // width: "178px",
  height: "56px",
  marginBlockEnd: "23px",
});

export const ModelTitles = styled(Typography)({
  fontSize: "24px",
  marginBlock: "39px",
});

export const MainButton = styled(Button)({
  height: "56px",
  width: "129px",
  borderRadius: "20px",
  textTransform: "capitalize",
});

export const AccordionBox = styled(Accordion)({
  backgroundColor: "transparent",
  boxShadow: "none",
  borderRadius: "15px !important",
  marginBlockEnd: "10px",
  justifyContent: "space-between",
  transition: "1s",
  padding: "10px",
});

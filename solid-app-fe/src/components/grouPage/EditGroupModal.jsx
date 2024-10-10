import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  InputLabel,
  TextField,
  MenuItem,
  FormControl,
  Alert,
  LinearProgress,
} from "@mui/material";
import Select from "@mui/material/Select";
import { style, titleStyle } from "../login/login-style.jsx";
import { ModelTitles, MainButton } from "../Group/groupDataStyle.jsx";
import { useDispatch } from "react-redux";
import { editGroup } from "../../redux/actions/index.js";
import { useSelector } from "react-redux";

export default function EditGroupModel(props) {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.user.darkMode);

  // eslint-disable-next-line no-unused-vars
  const [currency, setCurrency] = useState("");
  const [group, setGroup] = useState({
    name: props.group.name,
    currency: props.group.currency,
  });
  const [errorMessages, setErrorMessages] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const groupId = props.group._id;

  const handleChange = (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    setGroup({ ...group, currency: selectedCurrency });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await dispatch(editGroup(group, groupId));
      if (response.status) {
        props.setMessage(true);
        props.setInfoText(`Group updated successfully to ${group.name} `);
        props.handleClose();
      } else {
        setIsLoading(false);
        setErrorMessages(true);
        setErrorText(response.message);
        setTimeout(() => {
          setErrorMessages(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
            <ModelTitles sx={titleStyle} variant="h3" gutterBottom>
              Edit Group Information
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              {errorMessages && (
                <Fade in={true} timeout={600}>
                  <Alert
                    severity="error"
                    onClose={() => setErrorMessages(false)}
                    sx={{
                      position: "absolute",
                      top: "-45px",
                      width: "380px",
                      borderRadius: "10px",
                      border: "solid 1px red",
                    }}
                  >
                    {errorText}
                  </Alert>
                </Fade>
              )}
              <TextField
                className="inputRounded"
                label="Group Name"
                variant="outlined"
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
                defaultValue={group.name}
                sx={{ marginBlockEnd: "25px" }}
                onChange={(event) => {
                  setGroup({ ...group, name: event.target.value });
                }}
              />
              <FormControl
                fullWidth
                className="inputRounded"
                sx={{ marginBlockEnd: "25px" }}
                required
              >
                <InputLabel
                  className="TextField-border-radius"
                  id="demo-simple-select-label"
                >
                  Currency
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={group.currency}
                  label="Currency"
                  onChange={handleChange}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="PLN">PLN</MenuItem>
                </Select>
              </FormControl>

              <MainButton
                sx={{ padding: "0px 0px" }}
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Box sx={{ width: "100%", height: "56px" }}>
                    <LinearProgress
                      color="orange"
                      sx={{ height: "100%", borderRadius: "20px" }}
                    />
                  </Box>
                ) : (
                  "Save"
                )}
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

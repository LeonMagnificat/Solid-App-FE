import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Alert,
  TextField,
  LinearProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { style, titleStyle } from "../login/login-style.jsx";
import { ModelTitles, MainButton } from "./registerStyle.jsx";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterModel(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [fNameErrors, setFNameErrors] = useState(false);
  const [lNameErrors, setLNameErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 25
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (user.firstName === "") {
      setFNameErrors(true);
      console.log("firstName is empty");
    }
    if (user.lastName === "") {
      setLNameErrors(true);
      console.log("lastName is empty");
    }
    if (user.email === "") {
      setEmailErrors(true);
      console.log("email is empty");
    }
    if (user.password === "") {
      setPasswordErrors(true);
      console.log("password is empty");
    }

    try {
      const response = await dispatch(RegisterUser(user));
      console.log("response", response);
      if (response.status) {
        setTimeout(() => {
          navigate("/getStarted");
        }, 4000);
        console.log("response", response.status);
      } else {
        setIsLoading(false);
        console.log("response", response.message);
        setErrorText(response.message);
        setErrorMessages(true);
        setTimeout(() => {
          setErrorMessages(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
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
            <ModelTitles sx={titleStyle} variant="h3">
              Register
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              {errorMessages && (
                <Fade in={true} timeout={600}>
                  <Alert
                    severity="error"
                    onClose={() => setErrorMessages(false)}
                    sx={{
                      position: "absolute",
                      top: "-20px",
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
                sx={{ width: "193px", marginInlineEnd: "23px" }}
                label="First Name"
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                }}
                error={fNameErrors}
                required
                type="text"
              />
              <TextField
                className="inputRounded"
                sx={{ width: "193px" }}
                label="Last Name"
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                }}
                error={lNameErrors}
                required
                type="text"
              />
              <TextField
                className="inputRounded"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ marginBlockStart: "25px" }}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                error={emailErrors}
                type="email"
                required
              />
              <TextField
                className="inputRounded"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                sx={{ marginBlockStart: "25px", marginBlockEnd: "25px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                error={passwordErrors}
                fullWidth
                required
              />
              {/* <Typography>Or continue with</Typography>
              <GoogleButton fullWidth variant="contained">
                <img src={googleIcon} alt="" className="margin-right" />
                Google
              </GoogleButton> */}
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
                  "Sign Up"
                )}
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

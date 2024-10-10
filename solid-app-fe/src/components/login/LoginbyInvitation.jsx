import React from "react";
import {
  Grid,
  Box,
  Typography,
  Fade,
  TextField,
  Alert,
  LinearProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";

import {
  style2,
  titleStyle,
  MainButton,
  ModelTitles,
  ImageLogin,
} from "./login-style.jsx";
import { Link, useLocation } from "react-router-dom";
import loginImage from "../../icons/loginillustration.svg";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginInvitedUser } from "../../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginbyInvitation(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupId = location.pathname.split("/")[2];
  const email = location.pathname.split("/")[3];
  //const params = new URLSearchParams(window.location.search);
  //const token = params.get("token");

  const [user, setUser] = useState({
    email: email,
    password: "",
  });

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

    if (user.email === "") {
      setEmailErrors(true);
      console.log("email is empty");
    }
    if (user.password === "") {
      setPasswordErrors(true);
      console.log("password is empty");
    }

    try {
      const response = await dispatch(loginInvitedUser(user, groupId));

      if (response.status) {
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setIsLoading(false);
        console.log("error message", response.message);
        setErrorText(response.message);
        setErrorMessages(true);
        setTimeout(() => {
          setErrorMessages(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Grid container spacing={2} columns={16} sx={{ height: "103vh" }}>
      <Fade in={true} timeout={1000}>
        <Grid
          item
          xs={8}
          sx={{
            transition: "opacity 3s ease-in-out",
            backgroundColor: "#699CFF",
          }}
        >
          <ImageLogin>
            <img style={{ width: "100%" }} src={loginImage} alt="" />
          </ImageLogin>
        </Grid>
      </Fade>

      <Fade in={true} timeout={1000}>
        <Grid
          item
          xs={8}
          sx={{
            transition: "opacity 3s ease-in-out",
            backgroundColor: "#F4F7FD",
          }}
        >
          <Box sx={style2}>
            <ModelTitles sx={titleStyle} variant="h3" gutterBottom>
              Login
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              {errorMessages && (
                <Fade in={true} timeout={700}>
                  {/* <Slide direction="left" in={true} timeout={100} mountOnEnter unmountOnExit> */}
                  <Alert
                    severity="error"
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
                  {/* </Slide> */}
                </Fade>
              )}

              <TextField
                className="inputRounded"
                label="Email"
                variant="outlined"
                defaultValue={email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                error={emailErrors}
                type="email"
                fullWidth
                required
              />
              <TextField
                className="inputRounded"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBlockStart: "25px", marginBlockEnd: "25px" }}
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
                      color="primary"
                      sx={{ height: "100%", borderRadius: "20px" }}
                    />
                  </Box>
                ) : (
                  "Sign In"
                )}
              </MainButton>
            </form>
            <Box sx={{ marginBlockStart: "30px", display: "flex" }}>
              <Typography sx={{ marginInlineEnd: "5px" }}>
                Don’t have an account?{" "}
              </Typography>
              <Typography
                component={Link}
                to="/"
                sx={{ backgroundColor: "white", textDecoration: "none" }}
              >
                Click to get started
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Fade>
    </Grid>
  );
}

export default LoginbyInvitation;

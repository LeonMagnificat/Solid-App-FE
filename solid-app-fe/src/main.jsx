import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
const theme = createTheme({
  palette: {
    primary: {
      main: "#008A93",
    },
    secondary: {
      main: "#A62BF2",
    },
    orange: {
      main: "#E09B2D",
    },
    delete: {
      main: "#D32B02",
    },
    white: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Nunito', sans-serif;",
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

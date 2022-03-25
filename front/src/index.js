import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InfoProvider } from "./utility/InfoContext";
import "./i18n";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffd500",
    },
    secondary: {
      main: "#005bbb",
    },
    info: {
      main: "#84889A",
    },
  },
  components: {
    MuiCardContent: {
      defaultProps: {
        sx: {
          borderTop: "2px solid #0057b7",
          borderBottom: "2px solid #ffd700 ",
          borderRadius: 2,
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <InfoProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </InfoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

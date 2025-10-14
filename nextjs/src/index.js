import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InfoProvider } from "./utility/InfoContext";
import "./i18n";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

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

Sentry.init({
  dsn: "https://17f2314abee14e45bcc087e33d00fe30@o1179827.ingest.sentry.io/6292181",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InfoProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </InfoProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();

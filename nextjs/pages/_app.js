import { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InfoProvider } from "../src/utility/InfoContext";
import * as Sentry from "@sentry/react";
import "../src/index.css";
import "../src/App.css";
import "../src/components/feeds/feeds.css";
import "../src/components/footer/footer.css";
import "../src/components/header/mobile/mobile_header.css";
import "../src/components/lang/lang.css";
import "../src/components/menu/menu.css";
import "../src/components/partners/partners.css";
import "../src/containers/about/about.css";
import "../src/containers/auth/auth.css";
import "../src/containers/home/home.css";
import "../src/containers/post/post.css";
import "../src/containers/profile/profile.css";
import "../src/containers/resources/resources.css";
import "../src/i18n";

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

if (typeof window !== "undefined") {
  Sentry.init({
    dsn: "https://17f2314abee14e45bcc087e33d00fe30@o1179827.ingest.sentry.io/6292181",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      axios.defaults.baseURL = `${window.location.origin}/api`;
      const token = window.localStorage?.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <InfoProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </InfoProvider>
    </>
  );
}

export default MyApp;

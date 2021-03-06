import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./containers/home/Home";
import About from "./containers/about/About";
import Resources from "./containers/resources/Resources";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import Activate from "./containers/auth/Activate";
import Forgot from "./containers/auth/Forgot";
import Reset from "./containers/auth/Reset";
import CreatePost from "./containers/post/CreatePost";
import ViewPost from "./containers/post/ViewPost";
import Profile from "./containers/profile/Profile";
import Footer from "./components/footer/Footer";
import { Wrapper } from "@googlemaps/react-wrapper";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { InfoContext } from "./utility/InfoContext";
import { useEffect, useContext } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
if (window.location.hostname === "localhost") {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL + "/api";
} else {
  axios.defaults.baseURL = window.location.origin + "/api";
}

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

function App() {
  const { authorized } = useContext(InfoContext);

  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA_KEY}>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/view/:id" element={<ViewPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/activate" element={<Activate />} />
            <Route path="/password/forgot" element={<Forgot />} />
            <Route path="/password/reset/:token" element={<Reset />} />
            {authorized ? (
              <>
                <Route path="/post/create" element={<CreatePost />} />
                <Route path="/profile" element={<Profile />} />
              </>
            ) : null}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <Footer />
      </Wrapper>
    </GoogleReCaptchaProvider>
  );
}

export default App;

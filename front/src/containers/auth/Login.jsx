import "./auth.css";
import Header from "../../components/header/Header";
import { useState, useContext, useCallback, useEffect } from "react";
import { InfoContext } from "../../utility/InfoContext";
import MuiPhoneNumber from "material-ui-phone-number";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { TextField, IconButton, Button } from "@mui/material";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Loader from "../../components/loader/Loader.jsx";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [preferredMethod, setPreferredMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const { setStatus, setAuthorized } = useContext(InfoContext);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handlePreferredMethodChange = (method) => {
    setPreferredMethod(method);
  };

  const handleFormChange = () => {
    setFormData({
      ...Object.fromEntries(new FormData(document.getElementById("auth"))),
    });
  };

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    return executeRecaptcha("yourAction");
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const captcha = await handleReCaptchaVerify();
    axios
      .post("/auth/login", { ...formData, captcha })
      .then((res) => {
        setStatus({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        localStorage.setItem("token", res.data.accessToken);
        axios.defaults.headers.common["Authorization"] = res.data.accessToken;

        setAuthorized(true);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  };

  return (
    <div>
      <Header />
      <div className="auth_container">
        <form
          action=""
          id="auth"
          className={classes.form}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        >
          <i>{t("alternative")}</i>
          {preferredMethod === "phone" ? (
            <MuiPhoneNumber
              disableAreaCodes
              fullWidth
              type="text"
              label={t("phone_number")}
              name="phone"
              className={classes.phone}
              variant="outlined"
              defaultCountry={"ge"}
              autoFormat
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="Email"
                    color="secondary"
                    onClick={() => handlePreferredMethodChange("email")}
                  >
                    <EmailIcon />
                  </IconButton>
                ),
              }}
            />
          ) : (
            <TextField
              fullWidth
              label="E-mail"
              variant="outlined"
              id="email"
              type="email"
              name="email"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="Phone"
                    color="secondary"
                    onClick={() => handlePreferredMethodChange("phone")}
                  >
                    <PhoneIcon />
                  </IconButton>
                ),
              }}
            />
          )}

          <TextField
            fullWidth
            label={t("password")}
            variant="outlined"
            name="password"
            type="password"
            InputLabelProps={{ shrink: true }}
          />
          <div>
            {loading ? (
              <Loader />
            ) : (
              <Button type="submit" fullWidth variant="contained">
                {t("login")}
              </Button>
            )}
          </div>
          <div className="auth_secondary_links">
            <div className="secondary_action_btn">
              <Button
                onClick={() => navigate("/register")}
                variant="text"
                fullWidth
              >
                {t("registration")}
              </Button>
            </div>
            <div className="secondary_action_btn">
              <Button
                onClick={() => navigate("/password/forgot")}
                variant="text"
                fullWidth
              >
                {t("reset_password")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  form: {
    "& .MuiTextField-root": {
      margin: "10px 0",
    },
    "& h1": {
      marginBottom: 10,
    },
  },
  phone: {
    "& button": {
      width: 25,
      height: 25,
    },
  },
});

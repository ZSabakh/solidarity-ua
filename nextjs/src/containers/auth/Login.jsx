import Header from "../../components/header/Header";
import { useState, useContext, useCallback, useEffect } from "react";
import { InfoContext } from "../../utility/InfoContext";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
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
            <div style={{ position: "relative", margin: "10px 0" }}>
              <PhoneInput
                defaultCountry="ge"
                value={formData.phone || ""}
                onChange={(phone) => {
                  const input = document.querySelector('input[name="phone"]');
                  if (input) {
                    input.value = phone;
                    handleFormChange();
                  }
                }}
                inputProps={{
                  name: "phone",
                }}
                style={{ width: "100%" }}
              />
              <IconButton
                aria-label="Email"
                color="secondary"
                onClick={() => handlePreferredMethodChange("email")}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <EmailIcon />
              </IconButton>
            </div>
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
});

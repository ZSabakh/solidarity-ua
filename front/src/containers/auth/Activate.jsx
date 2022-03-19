import { TextField, IconButton, Button } from "@mui/material";
import "./auth.css";
import { useTranslation } from "react-i18next";
import MuiPhoneNumber from "material-ui-phone-number";
import { makeStyles } from "@mui/styles";
import { useState, useContext, useCallback } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Otp from "../../components/auth/Otp";
import axios from "axios";
import { InfoContext } from "../../utility/InfoContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Loader from "../../components/loader/Loader.jsx";

export default function Activate(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();

  const [formData, setFormData] = useState({});
  const [sentData, setSentData] = useState({});
  const [preferredMethod, setPreferredMethod] = useState("phone");
  const [loading, setLoading] = useState(false);
  const [requireOtp, setRequireOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const { setStatus, setAuthorized } = useContext(InfoContext);
  const { executeRecaptcha } = useGoogleReCaptcha();

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

    if (requireOtp) {
      axios
        .post("/auth/activate", { ...sentData, captcha, code: otp })
        .then((res) => {
          setStatus({
            open: true,
            message: res.data.message,
            severity: "success",
          });
          setLoading(false);
          localStorage.setItem("token", res.data.accessToken);
          setAuthorized(true);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          let message = err.response ? err.response.data.message : err.message;
          setStatus({ open: true, message: message, severity: "error" });
        });
    } else {
      axios
        .post("/auth/send-otp", { ...formData, captcha })
        .then((res) => {
          setSentData(formData);
          setLoading(false);
          setRequireOtp(true);
          setStatus({
            open: true,
            message: res.data.message,
            severity: "success",
          });
        })
        .catch((err) => {
          setLoading(false);
          let message = err.response ? err.response.data.message : err.message;
          setStatus({ open: true, message: message, severity: "error" });
        });
    }
  };

  const handlePreferredMethodChange = (method) => {
    setPreferredMethod(method);
  };

  return (
    <div>
      <Header />
      <div className="auth_container">
        <form action="" id="auth" className={classes.form} onSubmit={handleFormSubmit} onChange={handleFormChange}>
          {requireOtp ? (
            <>
              <p>Please enter code: </p>
              <Otp digitCount={4} setOtp={(cb) => setOtp(cb)} />
            </>
          ) : (
            <>
              <h1>{t("activation")}</h1>
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
                      <IconButton aria-label="Email" color="secondary" onClick={() => handlePreferredMethodChange("email")}>
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
                      <IconButton aria-label="Phone" color="secondary" onClick={() => handlePreferredMethodChange("phone")}>
                        <PhoneIcon />
                      </IconButton>
                    ),
                  }}
                />
              )}
            </>
          )}
          {loading ? (
            <Loader />
          ) : (
            <Button sx={{ m: "10px 0" }} type="submit" fullWidth variant="contained">
              {t("submit")}
            </Button>
          )}
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

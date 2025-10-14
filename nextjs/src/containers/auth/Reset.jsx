import { TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { useState, useContext, useCallback } from "react";
import axios from "axios";
import { InfoContext } from "../../utility/InfoContext";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Loader from "../../components/loader/Loader.jsx";

export default function Reset(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { setStatus } = useContext(InfoContext);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { token } = useParams();

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
  }, [executeRecaptcha]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const captcha = await handleReCaptchaVerify();

    axios
      .post("/auth/reset", { ...formData, token, captcha })
      .then((res) => {
        setLoading(false);
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
  };

  return (
    <div>
      <Header />
      <div className="auth_container">
        <form
          id="auth"
          className={classes.form}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
        >
          <h1>{t("password_reset")}</h1>
          <TextField
            fullWidth
            label={t("password")}
            variant="outlined"
            name="newPassword"
            type="password"
            InputLabelProps={{ shrink: true }}
          />

          {loading ? (
            <Loader />
          ) : (
            <Button
              sx={{ m: "10px 0" }}
              type="submit"
              fullWidth
              variant="contained"
            >
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

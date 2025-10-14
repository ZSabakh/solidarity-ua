import { TextField, IconButton, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { makeStyles } from "@mui/styles";
import { useState, useContext, useCallback } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Otp from "../../components/auth/Otp";
import axios from "axios";
import { InfoContext } from "../../utility/InfoContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Loader from "../../components/loader/Loader.jsx";

export default function Register(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();

  const [formData, setFormData] = useState({});
  const [sentData, setSentData] = useState({});
  const [preferredMethod, setPreferredMethod] = useState("email");
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

  const handleFormSubmit = async (_) => {
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
        .post("/auth/signup", { ...formData, captcha })
        .then((res) => {
          setSentData(formData);
          setLoading(false);
          // setRequireOtp(true);
          setStatus({
            open: true,
            message: res.data.message,
            severity: "success",
          });
          //Temporarily bypassing OTP verification
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
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePreferredMethodChange = (method) => {
    setPreferredMethod(method);
  };

  return (
    <div>
      <Header />
      <div className="auth_container">
        <form
          action=""
          id="auth"
          className={classes.form}
          onSubmit={handleSubmit(handleFormSubmit)}
          onChange={handleFormChange}
        >
          {requireOtp ? (
            <>
              <p>{t("please_enter_code")}: </p>
              <Otp digitCount={4} setOtp={(cb) => setOtp(cb)} />
            </>
          ) : (
            <>
              <h1>{t("registration")}</h1>
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
                {...register("name")}
                helperText={errors.name ? errors.name?.message : null}
                error={errors.name ? true : false}
                fullWidth
                label={t("full_name")}
                variant="outlined"
                name="name"
                type="text"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                {...register("password")}
                helperText={errors.password ? errors.password?.message : null}
                error={errors.password ? true : false}
                fullWidth
                label={t("password")}
                variant="outlined"
                name="password"
                type="password"
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}

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

          {!requireOtp ? (
            <div className="auth_secondary_links">
              <div className="secondary_action_btn">
                <Button
                  onClick={() => navigate("/login")}
                  variant="text"
                  fullWidth
                >
                  {t("login")}
                </Button>
              </div>
              <div className="secondary_action_btn">
                <Button
                  onClick={() => navigate("/register/activate")}
                  variant="text"
                  fullWidth
                >
                  {t("activate_existing_account")}
                </Button>
              </div>
            </div>
          ) : null}
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Fullname is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

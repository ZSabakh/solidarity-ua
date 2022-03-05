import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./auth.css";
import { useTranslation } from "react-i18next";
import LanguageChooser from "../../components/lang/LanguageChooser";

export default function Register() {
  const { t } = useTranslation();

  return (
    <div>
      <LanguageChooser />
      <div className="auth_container">
        <form action="" id="auth">
          <h1>{t("registration")}</h1>
          <div>
            <TextField
              fullWidth
              label="E-mail"
              variant="filled"
              type="email"
              name="email"
            />
          </div>
          <div>
            <TextField
              fullWidth
              type="number"
              label={t("phone_number")}
              variant="filled"
              name="number"
            />
          </div>
          <div>
            <TextField
              fullWidth
              label={t("full_name")}
              variant="filled"
              name="fullname"
              type="text"
            />
          </div>

          <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {t("gender.title")}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={t("gender.female")}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={t("gender.male")}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </form>
      </div>
    </div>
  );
}

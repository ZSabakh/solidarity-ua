import Header from "../../components/header/Header";
import { Grid } from "@mui/material";
import "./about.css";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="about_container">
        <h1>{t("about.page_title")}</h1>
        <Grid
          container
          spacing={3}
          sx={{
            textAlign: "left",
            "& p": { marginTop: "1rem", fontSize: "1.3rem" },
          }}
        >
          <Grid item xs={12} sm={8}>
            <div>
              {t("about.content").map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img
              style={{ width: "100%" }}
              src={`https://gcdnb.pbrd.co/images/bsJyTdgSWK7F.png`}
              alt="logo"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

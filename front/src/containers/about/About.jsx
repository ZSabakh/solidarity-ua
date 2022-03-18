import Header from "../../components/header/Header";
import { Grid, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./about.css";
import { useTranslation } from "react-i18next";
import Flag from "../../resources/images/merged_flag.png";

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
              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                Contact:
                <IconButton
                  sx={{ paddingY: 0 }}
                  onClick={() =>
                    window.open("https://fb.me/UAunity.2022", "_blank")
                  }
                >
                  <FacebookIcon />
                </IconButton>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img style={{ width: "100%" }} src={Flag} alt="logo" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

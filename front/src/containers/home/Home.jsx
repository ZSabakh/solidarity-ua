import "./home.css";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../../components/header/Header";
import Feeds from "../../components/feeds/Feeds";
import { useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";

const Home = () => {
  const { t } = useTranslation();
  const { authorized } = useContext(InfoContext);
  return (
    <div>
      <div id="app" className="home">
        <Header />
        <div className="home_greeting">
          <h1 className="home_title">
            <b>{t("portal_title")}</b> <div id="flag">🇺🇦</div>
          </h1>
          <span>{t("portal_description")}</span>
          <div className="home_auth">
            <Link
              to="/"
              onClick={() => {
                document.getElementById("feed").scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {t("find_support")}
            </Link>
            <Link to={authorized ? "/post/create" : "/register"}>{t("offer_support")}</Link>
          </div>
        </div>
        <Feeds />
      </div>
    </div>
  );
};

export default Home;

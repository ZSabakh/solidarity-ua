import "./home.css";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../../components/header/Header";
import Feeds from "../../components/feeds/Feeds";
import { useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import Menu from "../../components/menu/Menu";

const Home = () => {
  const { t } = useTranslation();
  const { authorized } = useContext(InfoContext);
  return (
    <div>
      <div id="app" className="home">
        <Header />
        <div className="home_greeting">
          <h1>{t("portal_title")} 🇺🇦</h1>
          <span>Dummy text at this moment. It will be cool later!</span>
          <div className="home_auth">
            <Link
              to="/"
              onClick={() => {
                document
                  .getElementById("feed")
                  .scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {t("i_need_accommodation")}
            </Link>
            <Link to={authorized ? "/post/create" : "/register"}>
              {t("i_have_accommodation")}
            </Link>
          </div>
        </div>
        <Feeds />
      </div>
    </div>
  );
};

export default Home;

import "./home.css";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageChooser from "../../components/lang/LanguageChooser";
import Feeds from "../../components/feeds/Feeds";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div id="app" className="home">
        <LanguageChooser />
        <div className="home_greeting">
          <h1>{t("portal_title")} 🇺🇦</h1>
          <span>Dummy text at this moment. It will be cool later!</span>
          <div className="home_auth">
            <Link to="/register/receiver">{t("i_need_accommodation")}</Link>
            <Link to="/register/donor">{t("i_have_accommodation")}</Link>
          </div>
        </div>
        <Feeds />
      </div>
    </div>
  );
};

export default Home;

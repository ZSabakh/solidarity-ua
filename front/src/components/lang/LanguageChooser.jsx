import UA from "../../resources/images/Flag_of_Ukraine.svg";
import GE from "../../resources/images/Flag_of_Georgia.svg";
import EN from "../../resources/images/Flag_of_the_United_Kingdom.svg";
import i18n from "../../i18n";
import "./lang.css";

export default function LanguageChooser() {
  const changeLanguage = (e, lng) => {
    localStorage.setItem("user_culture", lng);
    i18n.changeLanguage(lng);
    e.preventDefault();
  };

  return (
    <div className="lang_container">
      <div>
        <a href="/ua" onClick={(e) => changeLanguage(e, "ua")}>
          <img src={UA} alt="ua" /> UA
        </a>
      </div>
      <div>
        <a href="/ka" onClick={(e) => changeLanguage(e, "ka")}>
          <img src={GE} alt="ge" /> GE
        </a>
      </div>
      <div>
        <a href="/en" onClick={(e) => changeLanguage(e, "en")}>
          <img src={EN} alt="en" /> EN
        </a>
      </div>
    </div>
  );
}

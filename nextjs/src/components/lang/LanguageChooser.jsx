import Link from "next/link";
import UAFlag from "../../resources/images/Flag_of_Ukraine.svg";
import GEFlag from "../../resources/images/Flag_of_Georgia.svg";
import ENFlag from "../../resources/images/Flag_of_the_United_Kingdom.svg";
import i18n from "../../i18n";

export default function LanguageChooser() {
  const changeLanguage = (e, lng) => {
    localStorage.setItem("user_culture", lng);
    i18n.changeLanguage(lng);
    e.preventDefault();
  };

  return (
    <div className="lang_container">
      <div>
        <Link href="/ua" onClick={(e) => changeLanguage(e, "ua")}>
          <UAFlag width={30} height={20} /> UA
        </Link>
      </div>
      <div>
        <Link href="/ka" onClick={(e) => changeLanguage(e, "ka")}>
          <GEFlag width={30} height={20} /> GE
        </Link>
      </div>
      <div>
        <Link href="/en" onClick={(e) => changeLanguage(e, "en")}>
          <ENFlag width={30} height={20} /> EN
        </Link>
      </div>
    </div>
  );
}

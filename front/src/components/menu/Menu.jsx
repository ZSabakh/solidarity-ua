import "./menu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { t } = useTranslation();

  return (
    <div className="top_menu">
      <ul>
        <li>
          <Link to="/">{t("home")}</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/about">{t("about_project")}</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/login">{t("login")}</Link>
        </li>
      </ul>
    </div>
  );
}

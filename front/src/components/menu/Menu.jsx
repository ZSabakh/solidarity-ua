import "./menu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Menu() {
  const { t } = useTranslation();
  const { authorized } = useContext(InfoContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
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
          <Link to={authorized ? "/profile" : "/login"}>
            {authorized ? t("profile") : t("login")}
          </Link>
          {authorized ? (
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          ) : null}
        </li>
      </ul>
    </div>
  );
}

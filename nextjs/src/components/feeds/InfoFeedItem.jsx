import { Link } from "react-router-dom";
import InfoIcon from "../../resources/images/info-solid.svg";
import ReactTimeAgo from "react-time-ago";
import { useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import { useTranslation } from "react-i18next";

export default function InfoFeedItem() {
  let userCulture = localStorage.getItem("user_culture");
  const { t } = useTranslation();

  return (
    <Link to={`/resources`}>
      <div className="feed_item" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <div className="icon">
          <div style={{ backgroundColor: "#1766AA" }}>
            <InfoIcon width={35} height={35} />
          </div>
        </div>
        <div>
          <span className="feed_title">{t("resources_title")}</span>
        </div>
        <div>
          <span className="support_btn" style={{ backgroundColor: "#1766AA" }}>
            {t("view")}
          </span>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "react-router-dom";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";
import other from "../../resources/images/star-of-life-solid.svg";
import ReactTimeAgo from "react-time-ago";
import { useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import { useTranslation } from "react-i18next";

export default function FeedItem({ post, isPostOwner = false, onHide }) {
  let userCulture = localStorage.getItem("user_culture");

  const { t } = useTranslation();

  const { authorized } = useContext(InfoContext);

  const PostIcon = () => {
    if (post.type?.name?.en === "Transportation") {
      return <img src={car} alt="car" />;
    } else if (post.type?.name?.en === "Accomodation") {
      return <img src={building} alt="building" />;
    } else {
      return <img src={other} alt="car" />;
    }
  };

  const canDelete = () => {
    return isPostOwner && authorized;
  };

  const hideFeed = (e) => {
    e.preventDefault();
    // TODO implement
  };

  return (
    <Link to={`/post/view/${post._id}`}>
      <div className={post.mapa ? "feed_item feed_item_mapa" : "feed_item"}>
        <div className="icon">
          <div>
            <PostIcon />
          </div>
        </div>
        <div>
          <span className="time_data">
            {post.createdAt ? (
              <>
                <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" /> <span> · </span>
              </>
            ) : null}
            {post.city.name[userCulture]}, Georgia
            {post.mapa && (
              <span className="mapa">
                <span> · </span>
                <span>provided by </span>
                <span className="blue">mapa</span>
                <span className="yellow">help</span>
              </span>
            )}
          </span>
          <span className="feed_title">{post.title.en}</span>
        </div>
        <div>
          {canDelete() ? (
            <>
              <span className="support_btn hide_support" onClick={(e) => onHide(e)}>
                hide
              </span>
            </>
          ) : (
            <span className="support_btn">{t("view")}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

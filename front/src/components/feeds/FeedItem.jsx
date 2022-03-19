import { Link } from "react-router-dom";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";
import other from "../../resources/images/star-of-life-solid.svg";
import ReactTimeAgo from "react-time-ago";
import { useTranslation } from "react-i18next";

export default function FeedItem({ post }) {
  let userCulture = localStorage.getItem("user_culture");

  const { t } = useTranslation();

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
    return true;
  };

  const hideFeed = (e) => {
    e.preventDefault();
    // TODO implement
  };

  return (
    <Link to={`/post/view/${post._id}`}>
      <div className="feed_item">
        <div className="icon">
          <div>
            <PostIcon />
          </div>
        </div>
        <div>
          <span className="time_data">
            <ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
            <span> · </span>
            {post.city.name[userCulture]}, Georgia
          </span>
          <span className="feed_title">{post.title.en}</span>
        </div>
        <div>
          {canDelete() ? (
            <>
              <span className="support_btn">edit</span>
              <span
                className="support_btn hide_support"
                onClick={(e) => hideFeed(e)}
              >
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

import { Link } from "react-router-dom";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";
import other from "../../resources/images/star-of-life-solid.svg";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";

export default function FeedItem({ post }) {
  let userCulture = localStorage.getItem("user_culture");
  TimeAgo.addDefaultLocale(en);

  const PostIcon = () => {
    if (post.type?.name?.en === "Transportation") {
      return <img src={car} alt="car" />;
    } else if (post.type?.name?.en === "Accomodation") {
      return <img src={building} alt="building" />;
    } else {
      return <img src={other} alt="car" />;
    }
  };

  return (
    <div className="feed_item">
      <div className="icon">
        <div>
          <PostIcon />
        </div>
      </div>
      <div>
        <span className="time_data">
          <ReactTimeAgo date={post.createdAt} locale="en-US" />
          <span> · </span>
          {post.city.name[userCulture]}, Georgia
        </span>
        <Link to={`/post/view/${post._id}`} className="feed_title">
          {post.title.en}
        </Link>
      </div>
      <div>
        <Link to={`/post/view/${post._id}`} className="consume_support">
          View
        </Link>
      </div>
    </div>
  );
}

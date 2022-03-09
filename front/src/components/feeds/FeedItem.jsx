import { Link } from "react-router-dom";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";

export default function FeedItem({ post }) {
  let userCulture = localStorage.getItem("user_culture");

  const PostIcon = () => {
    if (post.type?.name?.en === "Transportation") {
      return <img src={car} alt="car" />;
    } else if (post.type?.name?.en === "Accomodation") {
      return <img src={building} alt="building" />;
    } else {
      return <img src={car} alt="car" />;
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
          {new Date(new Date(post.createdAt) - new Date()).getMinutes() +
            " minutes ago"}
          <span> · </span>
          {post.city.name[userCulture]}, Georgia
        </span>
        <Link to={`/post/view/${post._id}`} className="feed_title">
          {post.title[userCulture]}
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

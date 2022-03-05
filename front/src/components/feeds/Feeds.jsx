import { Link } from "react-router-dom";
import "./feeds.css";

import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";

export default function Feeds() {
  return (
    <div className="feeds_wrapper">
      {/* <!-- $0 --> */}
      <div className="feed_item">
        <div className="icon">
          <div>
            <img src={car} alt="Car" />
          </div>
        </div>
        <div>
          <span className="time_data">
            20m ago
            <span> · </span>
            Tbilisi, Georgia
          </span>
          <Link to="/" className="feed_title">
            Car for free
          </Link>
        </div>
        <div>
          <Link to="/consume/" className="consume_support">
            Receive
          </Link>
        </div>
      </div>
      {/* <!-- $0 --> */}

      {/* <!-- $1 --> */}
      <div className="feed_item">
        <div className="icon">
          <div>
            <img src={building} alt="building" />
          </div>
        </div>
        <div>
          <span className="time_data">
            1h ago
            <span> · </span>
            Tbilisi, Georgia
          </span>
          <Link to="/" className="feed_title">
            Accommodation for 2 person
          </Link>
        </div>
        <div>
          <Link to="/consume/" className="consume_support">
            Receive
          </Link>
        </div>
      </div>
      {/* <!-- $1 --> */}
    </div>
  );
}

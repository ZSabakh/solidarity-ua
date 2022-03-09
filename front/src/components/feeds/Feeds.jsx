import { useEffect, useState, useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import { Link } from "react-router-dom";
import "./feeds.css";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";
import FeedItem from "./FeedItem";
import axios from "axios";

export default function Feeds() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filterData, setFilterData] = useState({ page: 1 });
  const [loading, setLoading] = useState(false);
  const { setStatus } = useContext(InfoContext);

  useEffect(() => {
    axios
      .get("/post/get_all")
      .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  }, []);

  return (
    <div className="feeds_wrapper" id="feed">
      {loading ? (
        <p>Skeleton loader please</p>
      ) : (
        <>
          {posts.map((post) => (
            <FeedItem post={post} />
          ))}
        </>
      )}
    </div>
  );
}

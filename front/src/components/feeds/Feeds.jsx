import { useEffect, useState, useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "./feeds.css";
import FeedItem from "./FeedItem";
import axios from "axios";

export default function Feeds() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filterData, setFilterData] = useState({ page: 1 });
  const [loading, setLoading] = useState(true);
  const { setStatus } = useContext(InfoContext);

  useEffect(() => {
    axios
      .get("/post/get_all")
      .then((res) => {
        setLoading(false);
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
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={120} />
        </Stack>
      ) : (
        <>
          {posts.map((post, index) => (
            <FeedItem key={index} post={post} />
          ))}
        </>
      )}
    </div>
  );
}

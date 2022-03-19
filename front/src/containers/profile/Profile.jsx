import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { InfoContext } from "../../utility/InfoContext";
import Header from "../../components/header/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import FeedItem from "../../components/feeds/FeedItem";
import axios from "axios";
import "./profile.css";

export default function Profile() {
  const [posts, setPosts] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { setStatus } = useContext(InfoContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/post/by-me`)
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setStatus({
          open: true,
          message: err.response ? err.response.data.message : err.message,
          severity: "error",
        });
      });

    axios
      .get(`/auth/profile`)
      .then((res) => {
        setUser(res.data.profile);
      })
      .catch((err) => {
        setStatus({
          open: true,
          message: err.response ? err.response.data.message : err.message,
          severity: "error",
        });
      });
  }, []);

  return (
    <div>
      <Header />
      <Box className="container clear">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <div className="profile_info">
              <h2>{t("profile")}</h2>
              <div></div>
            </div>
          </Grid>
          <Grid item md={9} xs={12}>
            {loading ? (
              <ul className="list">
                {Array(10)
                  .fill()
                  .map((_, index) => (
                    <li key={index}>
                      <Skeleton height={180} />
                    </li>
                  ))}
              </ul>
            ) : (
              <>
                {posts.map((item, index) => (
                  <FeedItem key={index} post={item} />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

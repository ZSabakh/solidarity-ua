import Header from "../../components/header/Header";
import Map from "../../components/post/Map";
import { Skeleton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";
import other from "../../resources/images/star-of-life-solid.svg";
import "./post.css";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { setStatus, authorized } = useContext(InfoContext);

  const { t } = useTranslation();

  let userCulture = localStorage.getItem("user_culture");

  const { id } = useParams();

  const PostIcon = () => {
    if (post.type?.name?.en === "Transportation") {
      return <img src={car} alt="car" />;
    } else if (post.type?.name?.en === "Accomodation") {
      return <img src={building} alt="building" />;
    } else {
      return <img src={other} alt="car" />;
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/post/get/${id}`)
      .then((res) => {
        setPost(res.data.post);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="post_container">
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" height={450} />
            <div className="container skeleton_loader">
              <Skeleton variant="circular" width={40} height={40} style={{ margin: "20px 0" }} />
              <Skeleton variant="h1" style={{ marginBottom: 6 }} />
              <Skeleton variant="h2" style={{ marginBottom: 6 }} />
              <Skeleton variant="h2" style={{ marginBottom: 6 }} />
            </div>
          </Stack>
        ) : (
          <>
            {post.location?.lat && post.location?.lng ? <Map lat={post.location.lat} lng={post.location.lng} /> : <div className="maps_placeholder"></div>}
            <div className="support_info_wrapper">
              <div className="support_info_title">
                <div className="container">
                  <h1 style={{ display: "flex", alignItems: "center" }}>
                    <div className="icon" style={{ margin: "0 15px 10px 0" }}>
                      <div>
                        <PostIcon />
                      </div>
                    </div>
                    {post.title?.en}
                  </h1>
                  <h3>{post.description?.en}</h3>
                </div>
              </div>
            </div>
            <div className="container support_general_info">
              <Box>
                <Grid container md={8} xs={12}>
                  <h3>{post.type.name[userCulture]}</h3>
                  <table className="post_view_table">
                    {post.location?.description ? (
                      <tr>
                        <td>{t("location")}</td>
                        <td>{post.location?.description}</td>
                      </tr>
                    ) : null}
                    {post.accomodation?.rooms_amount ? (
                      <>
                        <tr>
                          <td>{t("amount_of_rooms")}</td>
                          <td>{post.accomodation.rooms_amount}</td>
                        </tr>
                        <tr>
                          <td>{t("amount_of_beds")}</td>
                          <td>{post.accomodation.beds_amount}</td>
                        </tr>
                      </>
                    ) : null}
                    {post.transportation?.capacity ? (
                      <>
                        <tr>
                          <td>{t("transport_capacity")}</td>
                          <td>{post.transportation.capacity}</td>
                        </tr>
                        <tr>
                          <td>{t("transportation_radius")}</td>
                          <td>{post.transportation.radius}</td>
                        </tr>
                      </>
                    ) : null}
                  </table>
                </Grid>
                <Grid container md={8} xs={12}>
                  <h3>{t("author")}</h3>
                  <table className="post_view_table">
                    <tr>
                      <td>{t("name")}</td>
                      <td>{post.author?.name}</td>
                    </tr>
                    {Object.keys(post.contact).map((key, index) => {
                      if (!post.contact[key].hasOwnProperty("value")) return null;
                      return (
                        <tr key={index}>
                          <td>{key}</td>
                          <td>
                            {!authorized && !post.contact[key].public && post.contact[key].value === "" ? (
                              <Link className="require_auth_error_msg" to="/login">
                                {t("ERROR_AUTHENTICATE_TO_VIEW_INFORMATION")}
                              </Link>
                            ) : (
                              post.contact[key].value
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </Grid>
              </Box>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

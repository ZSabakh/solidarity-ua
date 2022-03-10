import Header from "../../components/header/Header";
import { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import { Card, CardContent, CardHeader, Avatar, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";
import other from "../../resources/images/star-of-life-solid.svg";
import { makeStyles } from "@mui/styles";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { useTranslation } from "react-i18next";
import "./post.css";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { setStatus, authorized } = useContext(InfoContext);
  const classes = useStyles();

  const { t } = useTranslation();

  let userCulture = localStorage.getItem("user_culture");

  const { id } = useParams();

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

  const PostIcon = () => {
    if (post.type?.name?.en === "Transportation") {
      return <Avatar src={car} alt="car" />;
    } else if (post.type?.name?.en === "Accomodation") {
      return <Avatar src={building} alt="building" />;
    } else {
      return <Avatar src={other} alt="car" />;
    }
  };

  return (
    <div>
      <Header />
      <div className="view_post_container">
        <Card
          sx={{ width: "80%", margin: "40px auto" }}
          className={classes.card}
        >
          {!loading && post._id ? (
            <>
              <CardHeader
                avatar={
                  <div className="icon">
                    <PostIcon />
                  </div>
                }
                title={post?.title?.en}
                subheader={post?.city?.name?.en}
              />
              <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <h3>{post.description.en}</h3>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <b>{t("type")}:</b>
                            </td>
                            <td>{post.type.name[userCulture]}</td>
                          </tr>
                          {post.location.description ? (
                            <tr>
                              <td>
                                <b>{t("location")}:</b>
                              </td>
                              <td>{post.location.description}</td>
                            </tr>
                          ) : null}
                          {post.accomodation?.rooms_amount ? (
                            <>
                              <tr>
                                <td>
                                  <b>{t("amount_of_rooms")}:</b>
                                </td>
                                <td>{post.accomodation.rooms_amount}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>{t("amount_of_beds")}:</b>
                                </td>
                                <td>{post.accomodation.beds_amount}</td>
                              </tr>
                            </>
                          ) : null}
                          {post.transportation?.capacity ? (
                            <>
                              <tr>
                                <td>
                                  <b>{t("transport_capacity")}:</b>
                                </td>
                                <td>{post.transportation.capacity}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>{t("transportation_radius")}:</b>
                                </td>
                                <td>{post.transportation.radius}</td>
                              </tr>
                            </>
                          ) : null}
                        </tbody>
                      </table>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <b>{t("author")}:</b>
                            </td>
                            <td>{post.author.name}</td>
                          </tr>
                          {Object.keys(post.contact).map((key, index) => {
                            if (!post.contact[key].hasOwnProperty("value"))
                              return null;
                            return (
                              <tr key={index}>
                                <td>
                                  <b>{key}:</b>
                                </td>
                                {!authorized &&
                                !post.contact[key].public &&
                                post.contact[key].value === "" ? (
                                  <Link to="/login">
                                    {t(
                                      "ERROR_AUTHENTICATE_TO_VIEW_INFORMATION"
                                    )}
                                  </Link>
                                ) : (
                                  <td>{post.contact[key].value}</td>
                                )}
                              </tr>
                            );
                          })}
                          <tr>
                            <td>
                              <b>{t("submission_date")}:</b>
                            </td>
                            <td>{dateFormat(post.createdAt)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardContent>
            </>
          ) : (
            <div className="loader">
              <Stack spacing={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" height={200} />
              </Stack>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  card: {
    borderTop: "2px solid #0057b7",
    borderBottom: "2px solid #ffd700",
    borderRadius: "8px",
    "& .MuiCardContent-root": {
      border: "none",
    },
  },
  cardContent: {
    "& .MuiCardContent-root": {
      border: "1px dotted #0057b7",
    },
    "& h3": {
      fontSize: "1.2rem",
      marginBottom: "0.7rem",
      fontWeight: "bold",
    },
    //Select first column
    "& table": {
      width: "100%",
      fontSize: "1.1rem",
      "& td:first-child": {
        fontStyle: "italic",
      },
      "& td:nth-child(2)": {
        textAlign: "right",
      },
    },
  },
});

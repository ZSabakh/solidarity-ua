import Header from "../../components/header/Header";
import { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import { Card, CardContent, CardHeader, Avatar, Grid, Item } from "@mui/material";
import axios from "axios";
import car from "../../resources/images/car-solid.svg";
import building from "../../resources/images/building-solid.svg";
import other from "../../resources/images/star-of-life-solid.svg";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { setStatus, authorized } = useContext(InfoContext);
  const classes = useStyles();

  let userCulture = localStorage.getItem("user_culture");

  const id = window.location.pathname.split("/")[3];
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
      <Card sx={{ width: "80%", margin: "40px auto" }} className={classes.card}>
        <CardHeader
          avatar={
            <div className="icon">
              <PostIcon />
            </div>
          }
          title={post?.title?.en}
          subheader={post?.city?.name?.en}
        />
        <hr />
        {!loading && post._id ? (
          <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CardContent>
                  <h3>{post.description.en}</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <b>Type:</b>
                        </td>
                        <td>{post.type.name[userCulture]}</td>
                      </tr>
                      {post.location.description ? (
                        <tr>
                          <td>
                            <b>Location:</b>
                          </td>
                          <td>{post.location.description}</td>
                        </tr>
                      ) : null}
                      {post.accomodation?.rooms_amount ? (
                        <>
                          <tr>
                            <td>
                              <b>Amount of rooms:</b>
                            </td>
                            <td>{post.accomodation.rooms_amount}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Amount of beds:</b>
                            </td>
                            <td>{post.accomodation.beds_amount}</td>
                          </tr>
                        </>
                      ) : null}
                      {post.transportation?.capacity ? (
                        <>
                          <tr>
                            <td>
                              <b>Transport capacity:</b>
                            </td>
                            <td>{post.transportation.capacity}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Transportation radius:</b>
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
                          <b>Author:</b>
                        </td>
                        <td>{post.author.name}</td>
                      </tr>
                      {Object.keys(post.contact).map((key, index) => {
                        if (!post.contact[key].hasOwnProperty("value")) return null;
                        return (
                          <tr key={index}>
                            <td>
                              <b>{key}:</b>
                            </td>
                            {!authorized && !post.contact[key].public && post.contact[key].value === "" ? <Link to="/login">AUTHENTICATE TO VIEW INFORMATION</Link> : <td>{post.contact[key].value}</td>}
                          </tr>
                        );
                      })}
                      <tr>
                        <td>
                          <b>Submission Date:</b>
                        </td>
                        <td>{dateFormat(post.createdAt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <p>Loading</p>
        )}
      </Card>
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

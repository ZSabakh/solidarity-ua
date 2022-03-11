import Header from "../../components/header/Header";
import Map from "../../components/post/Map";
import { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./post.css";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { setStatus, authorized } = useContext(InfoContext);

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
  return (
    <div>
      <Header />
      <div className="view_post_container">
        {loading ? (
          <div></div>
        ) : (
          <>
            {post.location?.lat && post.location?.lng ? (
              <Map lat={post.location.lat} lng={post.location.lng} />
            ) : (
              <div className="maps_placeholder"></div>
            )}
            <div className="support_info_wrapper">
              <div className="support_info_title">
                <div className="container">
                  <h1>{post.description?.en}</h1>
                </div>
              </div>
            </div>
            <div className="container support_general_info">
              <div>
                <h3>{post.type.name[userCulture]}</h3>
                {post.location?.description ? (
                  <p>
                    {t("location")}: {post.location?.description}
                  </p>
                ) : null}
                {post.accomodation?.rooms_amount ? (
                  <>
                    <p>
                      {t("amount_of_rooms")}: {post.accomodation.rooms_amount}
                    </p>
                    <p>
                      {t("amount_of_beds")}: {post.accomodation.beds_amount}
                    </p>
                  </>
                ) : null}
                {post.transportation?.capacity ? (
                  <>
                    <p>
                      {t("transport_capacity")}: {post.transportation.capacity}
                    </p>
                    <p>
                      {t("transportation_radius")}: {post.transportation.radius}
                    </p>
                  </>
                ) : null}
              </div>
              <div>
                <h3>{t("author")}</h3>
                <p>
                  {t("name")}: {post.author.name}
                </p>
                <div>
                  {Object.keys(post.contact).map((key, index) => {
                    if (!post.contact[key].hasOwnProperty("value")) return null;
                    return (
                      <div key={index}>
                        <p>
                          {key} :
                          {!authorized &&
                          !post.contact[key].public &&
                          post.contact[key].value === "" ? (
                            <Link
                              className="require_auth_error_msg"
                              to="/login"
                            >
                              {t("ERROR_AUTHENTICATE_TO_VIEW_INFORMATION")}
                            </Link>
                          ) : (
                            post.contact[key].value
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

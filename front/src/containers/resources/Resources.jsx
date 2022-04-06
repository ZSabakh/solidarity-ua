import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Skeleton, Grid } from "@mui/material";
import Header from "../../components/header/Header";
import Resource from "../../components/resources/Resource";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("/resources")
      .then((res) => {
        setLoading(false);
        setResources(res.data.resources);
      })
      .catch((err) => {});
  }, []);

  console.log(resources);

  return (
    <>
      <Header />
      <div className="about_container">
        {loading ? (
          <Skeleton variant="rect" width="100%" height="100%" />
        ) : (
          <Grid container spacing={2}>
            {resources.map((resource) => (
              <Grid item xs={3}>
                <Resource key={resource._id} title={resource.name} description={resource.description} link={resource.link} image={resource.image} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

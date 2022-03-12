import Header from "../../components/header/Header";
import { Grid } from "@mui/material";
import "./about.css";

export default function About() {
  return (
    <div>
      <Header />
      <div className="about_container">
        <h1>About Project</h1>
        <Grid container spacing={3} sx={{ textAlign: "left", "& p": { marginTop: "1rem", fontSize: "1.3rem" } }}>
          <Grid item xs={12} sm={8}>
            <p>
              <p>
                This website was created in order to provide support to the Ukrainian people who are currently in Georgia. The unprovoked war that is taking place in Ukraine has already resulted in many being displaced,
                and forced to flee their homeland.
              </p>
              <p>We have seen the amazing support that has been pouring in from all over the world, and we want to do our part to help.</p>
              <p>
                This website will serve as a network for volunteers who will be able to offer help in the form of accomodation, transportation, or other support. We hope to connect Ukrainians who are stranded in Georgia
                with the resources that they need.
              </p>
              <p>
                This website was inspired by the heroic Polish and German volunteers who have set up similar portals in their countries. We would like to thank them for their example, and we hope to follow in their
                footsteps.
              </p>
            </p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img style={{ width: "100%" }} src={`https://gcdnb.pbrd.co/images/bsJyTdgSWK7F.png`} alt="logo" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

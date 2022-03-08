import { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  Autocomplete,
  Checkbox,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { InfoContext } from "../../utility/InfoContext";
import { useTranslation } from "react-i18next";
import Header from "../../components/header/Header";
import LocationChoose from "./LocationChoose";

const GOOGLE_MAPS_API_KEY = "AIzaSyBDhh-66lvWkkYrzDmjUbrNOHDt4EZSXsk";

export default function CreatePost() {
  const { t } = useTranslation();
  const [locationValue, setLocationValue] = useState();
  const [formData, setFormData] = useState({});
  const { cities, helpTypes } = useContext(InfoContext);
  const [selectedHelpTypes, setSelectedHelpTypes] = useState([]);
  const [selectedHelpTypeIDs, setSelectedHelpTypeIDs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: selectedHelpTypeIDs }));
  }, [selectedHelpTypes]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, location: locationValue }));
  }, [locationValue]);

  let userCulture = localStorage.getItem("user_culture");
  const classes = useStyles();

  const handleFormChange = (event, option) => {
    if (option === "city") event.target.name = "city";
    if (option === "check") event.target.value = event.target.checked;
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleGeneralFormChange = (event) => {};

  const handleFormSubmit = (event) => {};

  return (
    <>
      <Header />
      <Card sx={{ width: "80%", margin: "40px auto" }}>
        <CardContent>
          <Box
            className={classes.box}
            component="form"
            onSubmit={handleFormSubmit}
          >
            <b>{t("general_information")}: </b>
            <Box>
              <Autocomplete
                id="city-select"
                sx={{ flex: 2 }}
                options={cities}
                autoHighlight
                onChange={(event) => handleFormChange(event, "city")}
                getOptionLabel={(option) => option.name[userCulture]}
                renderOption={(props, option) => (
                  <option component="li" {...props} value={option._id}>
                    {option.name[userCulture]}
                  </option>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    name="city"
                    label={t("city")}
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
              <span style={{ flex: 0.1 }} />
              <Autocomplete
                multiple
                onChange={(_, values) => {
                  setSelectedHelpTypeIDs(values.map((value) => value._id));
                  setSelectedHelpTypes(values.map((value) => value.name.en));
                }}
                id="help-select"
                sx={{ flex: 2 }}
                options={helpTypes}
                autoHighlight
                getOptionLabel={(option) => option.name[userCulture]}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.name[userCulture]}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    name="help_type"
                    label={t("help_title")}
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Box>
            <form onChange={handleGeneralFormChange}>
              <TextField
                fullWidth
                name="title"
                onChange={handleFormChange}
                required
                label={t("title")}
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                onChange={handleFormChange}
                required
                name="description"
                label={t("description")}
              />
              <b>{t("create_post_general_information")}</b>
              <Box>
                <TextField
                  name="contact.phone.value"
                  onChange={handleFormChange}
                  label={t("phone_number")}
                />
                <Checkbox
                  name="contact.phone.public"
                  onChange={(event) => handleFormChange(event, "check")}
                  defaultChecked
                />
                <TextField
                  name="contact.email.value"
                  onChange={handleFormChange}
                  onChange={handleFormChange}
                  label="Email"
                />
                <Checkbox
                  name="contact.email.public"
                  onChange={(event) => handleFormChange(event, "check")}
                  defaultChecked
                />
                <TextField
                  name="contact.telegram.value"
                  onChange={(event) => handleFormChange(event, "check")}
                  onChange={handleFormChange}
                  label="Telegram"
                />
                <Checkbox
                  name="contact.email.telegram"
                  onChange={(event) => handleFormChange(event, "check")}
                  defaultChecked
                />
                <TextField
                  name="contact.whatsapp.value"
                  onChange={(event) => handleFormChange(event, "check")}
                  onChange={handleFormChange}
                  label="Whatsapp"
                />
                <Checkbox
                  name="contact.email.whatsapp"
                  onChange={(event) => handleFormChange(event, "check")}
                  defaultChecked
                />
                <TextField
                  name="contact.viber.value"
                  onChange={(event) => handleFormChange(event, "check")}
                  onChange={handleFormChange}
                  label="Viber"
                />
                <Checkbox
                  name="contact.email.viber"
                  onChange={(event) => handleFormChange(event, "check")}
                  defaultChecked
                />
              </Box>
            </form>
            <b>Approximate location: </b>
            <LocationChoose
              label={t("location")}
              value={locationValue}
              setValue={setLocationValue}
            />
            {selectedHelpTypes.includes("Accomodation") ? (
              <>
                <b>{t("accomodation_information")}: </b>
                <Box>
                  <TextField
                    sx={{ flex: 2 }}
                    name="accomodation.rooms_amount"
                    label={t("rooms_amount")}
                  />
                  <span style={{ flex: 0.1 }} />
                  <TextField
                    sx={{ flex: 2 }}
                    name="accomodation.beds_amount"
                    label={t("beds_amount")}
                  />
                </Box>
              </>
            ) : null}
            {selectedHelpTypes.includes("Transportation") ? (
              <>
                <b>{t("transportation_information")}: </b>
                <Box>
                  <TextField
                    sx={{ flex: 2 }}
                    name="transportation.capacity"
                    label={t("capacity_of_transport")}
                  />
                  <span style={{ flex: 0.1 }} />
                  <TextField
                    sx={{ flex: 2 }}
                    name="transportation.radius"
                    label={t("radius_willing_to_transport")}
                  />
                </Box>
              </>
            ) : null}
            <Button
              type={"submit"}
              sx={{ marginTop: 2, width: "50%", alignSelf: "center" }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  box: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: "0.4rem 0",
    },
    "& .MuiBox-root": {
      display: "flex",
    },
    "& .MuiIcon-root": {
      backgroundColor: "#ffd500",
      borderRadius: "50%",
      width: 25,
      height: 25,
      padding: 5,
    },
    "& b": {},
  },
});

//Create a custom SVG icon from car.svg

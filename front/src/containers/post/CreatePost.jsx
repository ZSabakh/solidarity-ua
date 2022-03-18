import { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  Autocomplete,
  Checkbox,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { InfoContext } from "../../utility/InfoContext";
import { useTranslation } from "react-i18next";
import Header from "../../components/header/Header";
import LocationChoose from "./LocationChoose";
import unflatten from "unflatten";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { t } = useTranslation();
  const [locationValue, setLocationValue] = useState();
  const [formData, setFormData] = useState({});
  const { cities, helpTypes, setStatus } = useContext(InfoContext);
  const [selectedHelpTypes, setSelectedHelpTypes] = useState([]);
  const [selectedHelpTypeIDs, setSelectedHelpTypeIDs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: selectedHelpTypeIDs }));
  }, [selectedHelpTypes]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, location: locationValue }));
  }, [locationValue]);

  let userCulture = localStorage.getItem("user_culture");
  const classes = useStyles();

  const handleFormChange = (event, option) => {
    let value = event.target.value;
    let key = event.target.name;
    if (option === "city") key = "city";
    if (option === "check") value = event.target.checked;

    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/post/submit", unflatten(formData))
      .then((res) => {
        setStatus({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  };

  return (
    <>
      <Header />
      <div className="post_container">
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
                      autocomplete="off"
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
              <Box sx={{ flexWrap: "wrap" }}>
                <Box sx={{ minWidth: 100 }}>
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
                </Box>
                <Box sx={{ minWidth: 100 }}>
                  <TextField
                    name="contact.email.value"
                    onChange={handleFormChange}
                    label="Email"
                  />
                  <Checkbox
                    name="contact.email.public"
                    onChange={(event) => handleFormChange(event, "check")}
                    defaultChecked
                  />
                </Box>
                <Box sx={{ minWidth: 100 }}>
                  <TextField
                    name="contact.telegram.value"
                    onChange={handleFormChange}
                    label="Telegram"
                  />
                  <Checkbox
                    name="contact.telegram.public"
                    onChange={(event) => handleFormChange(event, "check")}
                    defaultChecked
                  />
                </Box>
                <Box sx={{ minWidth: 100 }}>
                  <TextField
                    name="contact.whatsapp.value"
                    onChange={handleFormChange}
                    label="Whatsapp/Viber"
                  />
                  <Checkbox
                    name="contact.whatsapp.public"
                    onChange={(event) => handleFormChange(event, "check")}
                    defaultChecked
                  />
                </Box>
              </Box>
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
                      onChange={handleFormChange}
                      name="accomodation.rooms_amount"
                      label={t("rooms_amount")}
                    />
                    <span style={{ flex: 0.1 }} />
                    <TextField
                      sx={{ flex: 2 }}
                      onChange={handleFormChange}
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
                      onChange={handleFormChange}
                      name="transportation.capacity"
                      label={t("capacity_of_transport")}
                    />
                    <span style={{ flex: 0.1 }} />
                    <FormControl sx={{ flex: 2 }}>
                      <InputLabel id="radius-label">
                        {t("radius_willing_to_transport")}
                      </InputLabel>
                      <Select
                        labelId="radius-label"
                        name="transportation.radius"
                        label={t("radius_willing_to_transport")}
                        onChange={handleFormChange}
                      >
                        <MenuItem value={"Citywide"}>Citywide</MenuItem>
                        <MenuItem value={"Neighboring cities"}>
                          Neighboring cities
                        </MenuItem>
                        <MenuItem value={"Countrywide"}>Countrywide</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField onChange={handleFormChange} name="transportation.radius" label={t("radius_willing_to_transport")} /> */}
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
      </div>
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
    "& .MuiFormControl-root": {
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
    "& b": {
      margin: "0.4rem 0",
    },
  },
});

//Create a custom SVG icon from car.svg

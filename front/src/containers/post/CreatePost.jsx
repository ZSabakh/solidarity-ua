import { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { InfoContext } from "../../utility/InfoContext";
import { useTranslation } from "react-i18next";

export default function CreatePost() {
  const { t } = useTranslation();

  const { cities, helpTypes } = useContext(InfoContext);
  const [selectedHelpTypes, setSelectedHelpTypes] = useState([]);

  let userCulture = localStorage.getItem("user_culture");
  const classes = useStyles();
  return (
    <Card sx={{ width: "80%", margin: "40px auto" }}>
      <CardContent>
        <Box className={classes.box} component="form">
          <b>{t("general_information")}: </b>
          <Box>
            <Autocomplete
              id="city-select"
              sx={{ flex: 2 }}
              options={cities}
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
              onChange={(_, values) =>
                setSelectedHelpTypes(values.map((value) => value.name.en))
              }
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
          <TextField fullWidth name="title" label={t("title")} />
          <TextField
            fullWidth
            multiline
            rows={2}
            name="description"
            label={t("description")}
          />
          <b>{t("create_post_general_information")}</b>
          <Box>
            <TextField name="contact.phone.value" label={t("phone_number")} />
            <Checkbox name="contact.phone.public" defaultChecked />
            <TextField name="contact.email.value" label="Email" />
            <Checkbox name="contact.email.public" defaultChecked />
            <TextField name="contact.telegram.value" label="Telegram" />
            <Checkbox name="contact.email.telegram" defaultChecked />
            <TextField name="contact.whatsapp.value" label="Whatsapp" />
            <Checkbox name="contact.email.whatsapp" defaultChecked />
            <TextField name="contact.viber.value" label="Viber" />
            <Checkbox name="contact.email.viber" defaultChecked />
          </Box>
          <TextField fullWidth name="location" label={t("location")} />
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
          {/* <Icon>
            <img src={car} height={25} width={25} alt="transport logo" />
          </Icon> */}
        </Box>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles({
  box: {
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

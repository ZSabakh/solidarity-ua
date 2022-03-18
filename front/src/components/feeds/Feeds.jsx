import { useEffect, useState, useContext } from "react";
import { InfoContext } from "../../utility/InfoContext";
import {
  Skeleton,
  Stack,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  Pagination,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./feeds.css";
import FeedItem from "./FeedItem";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Feeds() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filterData, setFilterData] = useState({
    page: 1,
    Accomodation: true,
    Transportation: true,
    Other: true,
  });
  const [loading, setLoading] = useState(true);
  const { setStatus, cities, helpTypes } = useContext(InfoContext);
  let allCities = [
    { name: { en: "All", ka: "ყველა", ua: "всі" }, _id: "all" },
    ...cities,
  ];

  const classes = useStyles();
  let userCulture = localStorage.getItem("user_culture");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/post/get_all", { params: filterData })
      .then((res) => {
        setLoading(false);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  }, [filterData]);

  const handleCheckboxChange = (event) => {
    setFilterData((prevState) => ({
      ...prevState,
      page: 1,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <div className="feeds_wrapper" id="feed">
      <div className="feeds_filter_container">
        <FormControl
          sx={{ m: 3 }}
          component="fieldset"
          variant="standard"
          fullWidth
          className={classes.formControl}
        >
          <FormGroup>
            <div className="search_bar">
              <div>
                {helpTypes.map((helpType) => (
                  <FormControlLabel
                    key={helpType._id}
                    control={
                      <Checkbox
                        checked={filterData[helpType.name.en]}
                        onChange={handleCheckboxChange}
                        name={helpType.name.en}
                        color="primary"
                      />
                    }
                    label={helpType.name[userCulture]}
                  />
                ))}
              </div>
              <div>
                <Autocomplete
                  id="city-select"
                  sx={{ minWidth: 150, marginRight: 5 }}
                  options={allCities}
                  autoHighlight
                  onChange={(event) => {
                    setFilterData((prevState) => ({
                      ...prevState,
                      page: 1,
                      city: event.target.value,
                    }));
                  }}
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
              </div>
            </div>
          </FormGroup>
        </FormControl>
      </div>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
          <Skeleton height={150} />
        </Stack>
      ) : (
        <>
          {posts.map((post, index) => (
            <FeedItem key={index} post={post} />
          ))}

          {posts.length == 0 && !loading ? (
            <div className="data_not_found_msg">{t("data_not_found")}</div>
          ) : null}
        </>
      )}
      <div className="feeds_pagination_root">
        <Pagination
          className={classes.pagination}
          count={totalPages}
          onChange={(_, page) => {
            setFilterData((prevState) => ({
              ...prevState,
              page: page,
            }));
          }}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  formControl: {
    "& .MuiFormGroup-root": {
      flexDirection: "row",
    },
    "@media (max-width: 600px)": {
      "& .MuiAutocomplete-root": {
        width: "100%",
        margin: "0",
      },
    },
  },
  pagination: {
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
  },
});

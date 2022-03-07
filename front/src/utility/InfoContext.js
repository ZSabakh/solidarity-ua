import { useState, createContext, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

export const InfoContext = createContext();

export const InfoProvider = (props) => {
  const [cities, setCities] = useState([]);
  const [helpTypes, setHelpTypes] = useState([]);
  const [status, setStatus] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (cities.length === 0 || helpTypes.length === 0) {
      axios
        .get("/post/options")
        .then((res) => {
          setCities(res.data.cities);
          setHelpTypes(res.data.helpTypes);
        })
        .catch((err) => console.log(err));
    }
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <InfoContext.Provider value={[cities, setCities, helpTypes, setHelpTypes, setStatus]}>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={status.open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={status.severity} sx={{ width: "100%" }}>
          {status.message}
        </MuiAlert>
      </Snackbar>

      {props.children}
    </InfoContext.Provider>
  );
};

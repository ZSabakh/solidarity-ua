import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const InfoContext = createContext();

export const InfoProvider = (props) => {
  const [cities, setCities] = useState([]);
  const [helpTypes, setHelpTypes] = useState([]);

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

  return <InfoContext.Provider value={[cities, setCities, helpTypes, setHelpTypes]}>{props.children}</InfoContext.Provider>;
};

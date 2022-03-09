import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import i18n from "../../../i18n";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

import UA from "../../../resources/images/Flag_of_Ukraine.svg";
import GE from "../../../resources/images/Flag_of_Georgia.svg";
import EN from "../../../resources/images/Flag_of_the_United_Kingdom.svg";
import "./mobile_header.css";

export default function MobileHeader() {
  const { t } = useTranslation();

  const changeLanguage = (e, lng) => {
    localStorage.setItem("user_culture", lng);
    i18n.changeLanguage(lng);
    e.preventDefault();
  };

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (_) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link className="link" to="/">
          <ListItem button>
            <ListItemText primary={t("home")} />
          </ListItem>
        </Link>
        <Link className="link" to="/about">
          <ListItem button>
            <ListItemText primary={t("about_project")} />
          </ListItem>
        </Link>
        <Link className="link" to="/login">
          <ListItem button>
            <ListItemText primary={t("profile")} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem onClick={(e) => changeLanguage(e, "ka")} button>
          <ListItemIcon>
            <img src={GE} alt="ge" width="30" />
          </ListItemIcon>
          <ListItemText primary="GE" />
        </ListItem>
        <ListItem onClick={(e) => changeLanguage(e, "ua")} button>
          <ListItemIcon>
            <img src={UA} alt="ua" width="30" />
          </ListItemIcon>
          <ListItemText primary="UA" />
        </ListItem>
        <ListItem onClick={(e) => changeLanguage(e, "en")} button>
          <ListItemIcon>
            <img src={EN} alt="en" width="30" />
          </ListItemIcon>
          <ListItemText primary="EN" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="mobile_header">
      <MenuIcon onClick={toggleDrawer("right", true)} />
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}

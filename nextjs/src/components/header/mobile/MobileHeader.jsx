import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import i18n from "../../../i18n";
import { InfoContext } from "../../../utility/InfoContext";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import UAFlag from "../../../resources/images/Flag_of_Ukraine.svg";
import GEFlag from "../../../resources/images/Flag_of_Georgia.svg";
import ENFlag from "../../../resources/images/Flag_of_the_United_Kingdom.svg";

export default function MobileHeader() {
  const { t } = useTranslation();
  const { authorized } = useContext(InfoContext);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "70vw" }}
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
        <Link className="link" to="/resources">
          <ListItem button>
            <ListItemText primary={t("resources")} />
          </ListItem>
        </Link>
        <Link className="link" to={authorized ? "/profile" : "/login"}>
          <ListItem button>
            <ListItemText primary={authorized ? t("profile") : t("login")} />
          </ListItem>
        </Link>
        {authorized ? (
          <ListItem button>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </ListItem>
        ) : null}
      </List>
      <Divider />
      <List>
        <ListItem onClick={(e) => changeLanguage(e, "ka")} button>
          <ListItemIcon>
            <GEFlag width={30} height={20} />
          </ListItemIcon>
          <ListItemText primary="GE" />
        </ListItem>
        <ListItem onClick={(e) => changeLanguage(e, "ua")} button>
          <ListItemIcon>
            <UAFlag width={30} height={20} />
          </ListItemIcon>
          <ListItemText primary="UA" />
        </ListItem>
        <ListItem onClick={(e) => changeLanguage(e, "en")} button>
          <ListItemIcon>
            <ENFlag width={30} height={20} />
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

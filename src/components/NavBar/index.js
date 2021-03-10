import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import NavBarConfig from "./config";
import { AuthContext } from "../../context/Auth";

const useStyles = makeStyles(() => {
  return {
    title: {
      flexGrow: 1,
    },
  };
});

const NavBar = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const { handleLogOut } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    setTitle(NavBarConfig[location.pathname]);
  }, [location]);

  return (
    <AppBar position="relative" data-testid="nav-bar">
      <Toolbar>
        <Typography
          data-testid="navbar-title"
          variant="h6"
          color="inherit"
          className={classes.title}
        >
          {title}
        </Typography>
        <Button data-testid="logout" variant="outlined" onClick={handleLogOut}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

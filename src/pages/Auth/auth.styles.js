import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      marginTop: theme.spacing(20),
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
        borderRadius: "5px",
        border: "solid black 2px",
        background: "#fff",
      },
    },
    formcontrol: {
      marginTop: "2rem",
    },
  };
});

export default useStyles;

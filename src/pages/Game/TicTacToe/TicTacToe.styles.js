import { makeStyles, colors } from "@material-ui/core";
const { grey, green, orange, blue } = colors;

const useStyles = makeStyles((theme) => {
  return {
    container: {
      background: grey[200],
      minHeight: "100vh",
    },
    board: {
      width: "300px",
    },
    baseTypography: {
      color: grey[800],
    },
    paper: {
      "&:hover": {
        background: grey[300],
      },
    },
    progress: {
      textAlign: "center",
      visibility: "hidden",
      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(1),
        width: "290px",
        margin: "0px auto",
      },
    },
    visible: {
      visibility: "visible",
    },
    button: {
      margin: `${theme.spacing(1)}px auto`,
      width: "200px",
    },
    availableMoves: {
      background: green[600],
    },
    tile: {
      height: "50px",
      cursor: "pointer",
      userSelect: "none",
    },
    xLetter: {
      color: orange[400],
    },
    oLetter: {
      color: blue[500],
    },
  };
});

export default useStyles;

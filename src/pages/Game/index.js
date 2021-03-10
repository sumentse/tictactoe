import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  LinearProgress,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { blue, orange, grey, yellow } from "@material-ui/core/colors";
import { useState } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";

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
      background: yellow[500],
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

const INITIAL_GAMEBOARD = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const Game = () => {
  const [board, setBoard] = useState(INITIAL_GAMEBOARD);
  const [computerScore, setComputerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [isPlayerNext, setIsPlayerNext] = useState(true);
  const [showSuggestMove, setShowSuggestMove] = useState(false);
  const [winner, setWinner] = useState(null);
  const classes = useStyles();

  const handleClick = (row, col) => {};

  const newGame = () => {};

  const resetScoreBoard = () => {};

  const buildBoard = () => {
    const tiles = (data, rowIndex) =>
      data.map((tile, tileIndex) => {
        return (
          <Grid key={uuid()} item xs={4} data-testid={`tile-row${rowIndex}-col${tileIndex}`}>
            <Paper
              className={clsx(classes.paper, {
                [classes.availableMoves]: showSuggestMove && !board[rowIndex][tileIndex],
              })}
              elevation={0}
              onClick={() => handleClick(rowIndex, tileIndex)}
            >
              <Box p={2}>
                <Typography
                  className={clsx(classes.tile, {
                    [classes.xLetter]: tile === "X",
                    [classes.oLetter]: tile === "O",
                  })}
                  variant="h3"
                  align="center"
                >
                  {tile}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        );
      });
    return board.map(tiles);
  };

  return (
    <Container className={classes.container} data-testid="tic-tac-toe">
      <Box p={2}>
        <Box mt={1}>
          <Typography className={classes.baseTypography} variant="h5" align="center">
            🙂 {playerScore} : {computerScore} 🤖
          </Typography>
          <LinearProgress
            className={clsx(classes.progress, { [classes.visible]: !isPlayerNext && !winner })}
          />
        </Box>
        <Box mt={3}>
          <Grid container justify="center">
            <Grid
              className={classes.board}
              container
              spacing={1}
              justify="center"
              data-testid="grid-board"
            >
              {buildBoard()}
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              disabled={!!winner}
              onClick={() => setShowSuggestMove(!showSuggestMove)}
            >
              Suggest Move
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              onClick={newGame}
            >
              New Game
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              className={classes.button}
              color="secondary"
              onClick={resetScoreBoard}
            >
              Reset Score
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Game;

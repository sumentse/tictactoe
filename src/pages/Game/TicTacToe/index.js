import { Box, Container, Grid, Paper, Typography, Button, LinearProgress } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import useStyles from "./TicTacToe.styles";
import { cloneDeep } from "lodash";

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
  const counterRef = useRef(0);
  const classes = useStyles();

  const handleClick = (row, col) => {
    if (isPlayerNext && !winner) {
      // fixes a reference issue with using 2d arrays [...board] on reseting the game
      const boardCopy = cloneDeep(board);

      // handle the case when that tile is already taken
      if (boardCopy[row][col]) {
        return;
      }

      boardCopy[row][col] = "X";
      setBoard(boardCopy);
      setIsPlayerNext(!isPlayerNext);
      counterRef.current++;
    }
  };

  const newGame = () => {
    counterRef.current = 0;
    setBoard(INITIAL_GAMEBOARD);
    setIsPlayerNext(true);
    setWinner(null);
  };

  const resetScoreBoard = () => {
    setPlayerScore(0);
    setComputerScore(0);
  };

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

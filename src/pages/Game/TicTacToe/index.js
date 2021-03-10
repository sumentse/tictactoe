import { Box, Container, Grid, Paper, Typography, Button, LinearProgress } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import useStyles from "./TicTacToe.styles";
import { cloneDeep } from "lodash";
import EngineAPI from "../../../services/api/engine";

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

  useEffect(() => {
    const getComputerNextMove = async () => {
      try {
        const response = await EngineAPI.post(board);
        setIsPlayerNext(!isPlayerNext);
        setBoard(response.data.board);
        counterRef.current++;
      } catch (err) {
        console.log("some error occured");
      }
    };

    if (!isPlayerNext && counterRef.current < 9) {
      getComputerNextMove();
    }
  }, [isPlayerNext, board]);

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

  const calculateWinner = (squares) => {
    if (winner) return null;
    // makes it easier to deal and read with instead of doing it in 2d dimension
    const flattenSquares = squares.flat();
    // all possible winning combinations (3 horizontal, 3 vertical, 2 diagonal)
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0, lineTotals = lines.length; i < lineTotals; i++) {
      const [a, b, c] = lines[i];
      if (
        flattenSquares[a] &&
        flattenSquares[a] === flattenSquares[b] &&
        flattenSquares[a] === flattenSquares[c]
      ) {
        const winningLetter = flattenSquares[a];

        if (winningLetter === "X") {
          setPlayerScore(playerScore + 1);
        } else {
          setComputerScore(computerScore + 1);
        }
        setWinner(winningLetter);
      }
    }
    if (counterRef.current === 9 && !winner) {
      setWinner("draw");
    }
    return null;
  };

  const renderBoardAnnoucement = () => {
    let message = "";
    if (winner === "draw") {
      message = "Game is a draw";
    }

    if (winner === "X") {
      message = "Player is the winner!";
    }

    if (winner === "O") {
      message = "AI is the winner!";
    }

    return (
      <Typography className={classes.baseTypography} variant="h5" align="center">
        {message}
      </Typography>
    );
  };

  calculateWinner(board);

  return (
    <Container className={classes.container} data-testid="tic-tac-toe">
      <Box p={2}>
        <Box>{renderBoardAnnoucement()}</Box>
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

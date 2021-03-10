import { Box, Container, Grid, Paper, Typography, Button, LinearProgress } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import useStyles from "./TicTacToe.styles";
import { cloneDeep } from "lodash";
import EngineAPI from "../../../services/api/engine";
import { Alert } from "@material-ui/lab";
import { mapTilePosition } from "../../../utils/game";

const INITIAL_GAMEBOARD = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const TILE_INDEX_POSITION = mapTilePosition(3, 3);

const Game = () => {
  const [board, setBoard] = useState(INITIAL_GAMEBOARD);
  const [computerScore, setComputerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [isPlayerNext, setIsPlayerNext] = useState(true);
  const [showSuggestMove, setShowSuggestMove] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [error, setError] = useState("");
  const counterRef = useRef(0);
  const classes = useStyles();

  useEffect(() => {
    const getComputerNextMove = async () => {
      try {
        const response = await EngineAPI.post(board);
        setIsPlayerNext((prevState) => !prevState);
        setBoard(response.data.board);
        counterRef.current++;
      } catch (err) {
        setError("An error has occured");
      }
    };

    if (!isPlayerNext && counterRef.current < 9 && !winner) {
      getComputerNextMove();
    }
  }, [isPlayerNext, board, winner]);

  // temporary show the suggested moves
  useEffect(() => {
    let timer;
    if (showSuggestMove) {
      timer = setTimeout(() => setShowSuggestMove((prevState) => !prevState), 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSuggestMove]);

  const handleClick = (row, col) => {
    if (isPlayerNext && !winner) {
      // handle the case when that tile is already taken
      if (board[row][col]) {
        return;
      }
      setBoard((prevBoard) => {
        // fixes a reference issue with using 2d arrays [...board] on reseting the game
        const boardCopy = cloneDeep(prevBoard);

        boardCopy[row][col] = "X";
        return boardCopy;
      });
      setIsPlayerNext(!isPlayerNext);
      counterRef.current++;
    }
  };

  const newGame = () => {
    counterRef.current = 0;
    setBoard(INITIAL_GAMEBOARD);
    setError("");
    setIsPlayerNext(true);
    setWinningLine([]);
    setWinner(null);
  };

  const resetScoreBoard = () => {
    setPlayerScore(0);
    setComputerScore(0);
  };

  const buildBoard = () => {
    const tiles = (tile, index) => {
      // reference the 2d array and keeping this simple
      const { row, col } = TILE_INDEX_POSITION.get(index);
      return (
        <Grid key={uuid()} item xs={4}>
          <Paper
            className={clsx({
              [classes.paper]: !board[row][col] && !winner,
              [classes.availableMoves]: showSuggestMove && !board[row][col],
              [classes.winningLine]: winningLine.indexOf(index) !== -1,
            })}
            elevation={0}
            onClick={() => handleClick(row, col)}
          >
            <Box p={2}>
              <Typography
                data-testid={`tile-row${row}-col${col}`}
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
    };
    return board.flat().map(tiles);
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
          setPlayerScore((prevScore) => prevScore + 1);
        } else {
          setComputerScore((prevScore) => prevScore + 1);
        }
        setWinningLine([a, b, c]);
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
      <Typography
        data-testid="annoucement"
        className={clsx(classes.baseTypography, classes.annoucement)}
        variant="h5"
        align="center"
      >
        {message}
      </Typography>
    );
  };

  calculateWinner(board);

  return (
    <Container className={classes.container} data-testid="tic-tac-toe">
      <Box p={2}>
        <Box mt={1}>
          <Typography
            data-testid="score-board"
            className={classes.baseTypography}
            variant="h5"
            align="center"
          >
            🙂 {playerScore} : {computerScore} 🤖
          </Typography>
          <Box mt={1}>{renderBoardAnnoucement()}</Box>
          <LinearProgress
            className={clsx(classes.progress, { [classes.visible]: !isPlayerNext && !winner })}
          />
          {error && (
            <Alert severity="error" className={classes.error}>
              {error}
            </Alert>
          )}
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
              data-testid="suggest-move"
              variant="contained"
              className={classes.button}
              color="primary"
              disabled={!!winner}
              onClick={() => setShowSuggestMove((prevState) => !prevState)}
            >
              Suggest Move
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              data-testid="new-game"
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
              data-testid="reset-score"
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

import { fireEvent, render, screen } from "@testing-library/react";
import TicTacToe from ".";
import EngineAPI from "../../../services/api/engine";

jest.mock("../../../services/api/engine");

describe("Tic Tac Toe", () => {
  afterEach(() => jest.resetAllMocks());
  test("should render the component", () => {
    const { queryByTestId } = render(<TicTacToe />);
    expect(queryByTestId("tic-tac-toe")).toBeTruthy();
    expect(queryByTestId("grid-board").children.length).toBe(9);
    expect(queryByTestId("score-board").textContent).toBe("🙂 0 : 0 🤖");
  });
  test("should be able to click tile", async () => {
    EngineAPI.post.mockImplementation(() => {
      return {
        data: {
          board: [
            ["", "X", "O"],
            ["", "", ""],
            ["", "", ""],
          ],
        },
      };
    });
    const { getByTestId } = render(<TicTacToe />);
    fireEvent.click(getByTestId("tile-row0-col1"));
    expect((await screen.findByTestId("tile-row0-col1")).textContent).toBe("X");
    expect((await screen.findByTestId("tile-row0-col2")).textContent).toBe("O");
  });
  test("should be able to update score board and reset", async () => {
    EngineAPI.post.mockImplementation(() => {
      return {
        data: {
          board: [
            ["X", "O", ""],
            ["X", "O", ""],
            ["", "O", "X"],
          ],
        },
      };
    });
    const { getByTestId } = render(<TicTacToe />);
    fireEvent.click(getByTestId("tile-row0-col0"));
    expect((await screen.findByTestId("score-board")).textContent).toBe("🙂 0 : 1 🤖");
    expect(getByTestId("annoucement").textContent).toBe("AI is the winner!");
    fireEvent.click(getByTestId("reset-score"));
    expect((await screen.findByTestId("score-board")).textContent).toBe("🙂 0 : 0 🤖");
  });
  test("should be able to start a new game", async () => {
    const { getByTestId } = render(<TicTacToe />);
    fireEvent.click(getByTestId("tile-row0-col1"));
    fireEvent.click(getByTestId("new-game"));
    expect((await screen.findByTestId("tile-row0-col1")).textContent).toBe("");
    expect(getByTestId("score-board").textContent).toBe("🙂 0 : 0 🤖");
  });
});

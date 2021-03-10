import { fireEvent, render } from "@testing-library/react";
import Game from ".";

describe("Tic Tac Toe", () => {
  test("should render the component", () => {
    const { queryByTestId } = render(<Game />);
    expect(queryByTestId("tic-tac-toe")).toBeTruthy();
    expect(queryByTestId("grid-board").children.length).toBe(9);
  });
  test("should be able to click tile", () => {
    const { getByTestId, getByText } = render(<Game />);
    fireEvent.click(getByTestId("tile-0"));
    getByText("X");
  });
});

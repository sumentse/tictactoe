import { render, fireEvent } from "@testing-library/react";
import NavBar from ".";
import { AuthContext } from "../../context/Auth";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const logoutUser = jest.fn();

test("should render navbar screen", () => {
  const history = createMemoryHistory();
  history.push("/game/tictactoe");
  const { queryByTestId } = render(
    <Router history={history}>
      <AuthContext.Provider value={{ handleLogOut: logoutUser }}>
        <NavBar />
      </AuthContext.Provider>
    </Router>,
  );
  expect(queryByTestId("nav-bar")).toBeTruthy();
  expect(queryByTestId("navbar-title").textContent).toBe("Tic Tac Toe");
  fireEvent.click(queryByTestId("logout"));
  expect(logoutUser).toBeCalled();
});

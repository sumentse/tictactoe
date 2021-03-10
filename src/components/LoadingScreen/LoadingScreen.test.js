import { render } from "@testing-library/react";
import LoadingScreen from ".";

test("should render loading screen", () => {
  const { queryByTestId } = render(<LoadingScreen />);
  expect(queryByTestId("spinner")).toBeTruthy();
});

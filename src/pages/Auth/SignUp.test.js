import { render } from "@testing-library/react";
import SignUp from "./SignUp";
import { AuthProvider } from "../../context/Auth";

jest.mock("react-router-dom", () => {
  return {
    useLocation: jest.fn(),
  };
});

describe("Signup page", () => {
  test("should render component", () => {
    const { getByText } = render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>,
    );
    getByText(/signup now to play ai games/i);
  });
});

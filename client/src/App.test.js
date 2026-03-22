import { render, screen } from "@testing-library/react";
import Login from "./pages/auth/Login";

test("renders Login page", () => {
  render(<Login />);
  expect(
    screen.getByRole("heading", {
      name: /Welcome back/i
    })
  ).toBeInTheDocument();
});

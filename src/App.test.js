import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("Renders Affordability Calculator title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Affordability Calculator/i);
  expect(linkElement).toBeInTheDocument();
});

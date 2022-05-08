import { render, fireEvent, screen } from "@testing-library/react";
import Button from "../components/Button";

const handleButtonSelectedMock = jest.fn();

beforeEach(() => {
  render(
    <Button
      label="test button"
      className="btn"
      handleButtonSelected={handleButtonSelectedMock}
    />
  );
});

describe("Button Component", () => {
  test("renders the button correctly", () => {
    expect(screen.getByText("test button")).toBeInTheDocument();
  });
  test("calls the handleButtonClick function when clicked", () => {
    const button = screen.getByText("test button");
    fireEvent.click(button);
    expect(handleButtonSelectedMock).toHaveBeenCalledTimes(1);
  });
});

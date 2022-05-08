import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("Button Component", () => {
  test("renders the button correctly", () => {
    const handleButtonSelectedMock = jest.fn();
    render(
      <Button
        label="test button"
        className="btn-selected"
        handleButtonSelected={handleButtonSelectedMock}
      />
    );
    const button = screen.getByText("test button");
    expect(button).toBeInTheDocument();
  });
  test("calls the handleButtonClick function when clicked", () => {
    const handleButtonSelectedMock = jest.fn();
    render(
      <Button
        label="test button"
        className="btn-selected"
        handleButtonSelected={handleButtonSelectedMock}
      />
    );
    const button = screen.getByText("test button");
    fireEvent.click(button);
    expect(handleButtonSelectedMock).toHaveBeenCalledTimes(1);
  });
});

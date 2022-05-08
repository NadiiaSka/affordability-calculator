import { render, fireEvent, screen } from "@testing-library/react";
import ButtonRow from "../components/ButtonRow";

const setButtonSelectedMock = jest.fn();

beforeEach(() => {
  render(
    <ButtonRow
      buttonLabels={[
        { id: 1, name: "firstButton", label: "Yes", value: true },
        { id: 2, name: "firstButton", label: "No", value: false },
      ]}
      buttonSelected={{ firstButton: false }}
      setButtonSelected={setButtonSelectedMock}
    />
  );
});

describe("ButtonRow Component", () => {
  test("renders two buttons on the screen", () => {
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(2);
  });
  test("clicking one button makes it selected and setButtonSelected function called", () => {
    const button1 = screen.getByText("Yes");
    const button2 = screen.getByText("No");

    //before the click no buttons selected
    expect(button1).not.toHaveClass("selected");
    expect(button2).not.toHaveClass("selected");

    fireEvent.click(button1);
    expect(setButtonSelectedMock).toHaveBeenCalledTimes(1);

    //after the click first buttons selected
    expect(button1).toHaveClass("selected");
    expect(button2).not.toHaveClass("selected");
  });
});

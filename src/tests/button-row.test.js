import { render, fireEvent, screen } from "@testing-library/react";
import ButtonRow from "../components/ButtonRow";

const setButtonSelectedMock = jest.fn();

beforeEach(() => {
  render(
    <ButtonRow
      buttonLabels={[
        { id: 1, name: "firstButton", label: "Yes", value: true },
        { id: 2, name: "secondButton", label: "No", value: false },
      ]}
      buttonSelected={{ firstButton: false }}
      setButtonSelected={setButtonSelectedMock}
    />
  );
});

describe("ButtonRow Component", () => {
  test("renders buttons with correct labels", () => {
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });
  test("clicking one button calls setButtonSelected with correct value", () => {
    const button1 = screen.getByText("Yes");
    fireEvent.click(button1);

    expect(setButtonSelectedMock).toHaveBeenCalledWith({
      firstButton: true,
    });
  });
  test("calls setButtonSelected with correct object on click", () => {
    fireEvent.click(screen.getByText("Yes"));
    expect(setButtonSelectedMock).toHaveBeenCalledWith({
      firstButton: true,
    });
  });
});

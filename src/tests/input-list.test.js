import { render, fireEvent, screen } from "@testing-library/react";
import InputList from "../components/InputList";

const calculateTotalMock = jest.fn();
const setValuesMock = jest.fn();

beforeEach(() => {
  render(
    <InputList
      inputLabel="test label"
      buttonLabel="add input"
      name="test input"
      values={{}}
      setValues={setValuesMock}
      calculateTotal={calculateTotalMock}
      type=""
    />
  );
});

describe("InputList Component", () => {
  test("renders an input field with a button", () => {
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "add input",
      })
    ).toBeInTheDocument();
  });
  test("clicking a button adds second input field", () => {
    // only one input field before clicking the button
    expect(screen.getAllByRole("spinbutton").length).toBe(1);

    const button = screen.getByRole("button", {
      name: "add input",
    });

    fireEvent.click(button);

    //one more input field added after the click
    expect(screen.getAllByRole("spinbutton").length).toBe(2);
  });
});

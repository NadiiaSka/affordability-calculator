import { render, fireEvent, screen } from "@testing-library/react";
import InputRow from "../components/InputRow";

const calculateTotalMock = jest.fn();
const setValuesMock = jest.fn();

beforeEach(() => {
  render(
    <InputRow
      name="test input"
      values={{}}
      setValues={setValuesMock}
      calculateTotal={calculateTotalMock}
      type="withDropDown"
    />
  );
});

describe("InputRow Component", () => {
  test("renders an input field and a dropdown", () => {
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  test("calls setValues and calculateTotal function when the input changes", () => {
    const input = screen.getByRole("spinbutton");
    const value = 123;
    fireEvent.change(input, { target: { value } });

    expect(setValuesMock).toHaveBeenCalledTimes(1);
    expect(setValuesMock).toHaveBeenCalledWith({ "test input": "123" });

    expect(calculateTotalMock).toHaveBeenCalledTimes(1);
    expect(calculateTotalMock).toHaveBeenCalledWith({ "test input": "123" });
  });
});

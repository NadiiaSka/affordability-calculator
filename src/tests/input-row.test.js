import { render, fireEvent, screen } from "@testing-library/react";
import InputRow from "../components/InputRow";

const calculateTotalMock = jest.fn();
const setValuesMock = jest.fn();
const handleRemoveMock = jest.fn();

beforeEach(() => {
  render(
    <InputRow
      name="test input"
      values={{}}
      setValues={setValuesMock}
      calculateTotal={calculateTotalMock}
      type="withDropDown"
      handleRemove={handleRemoveMock}
    />
  );
});

describe("InputRow Component", () => {
  test("renders an input field and a dropdown", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  test("calls setValues and calculateTotal function when the input changes", () => {
    const input = screen.getByRole("textbox");
    const value = 123;
    fireEvent.change(input, { target: { value } });

    expect(setValuesMock).toHaveBeenCalledTimes(1);
    expect(setValuesMock).toHaveBeenCalledWith({ "test input": "123" });

    expect(calculateTotalMock).toHaveBeenCalledTimes(1);
    expect(calculateTotalMock).toHaveBeenCalledWith({ "test input": "123" });
  });
  test("calls setValues and calculateTotal function when the dropdown changes", () => {
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "1000" } });

    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "perWeek" } });

    expect(setValuesMock).toHaveBeenCalledTimes(2);
    expect(setValuesMock).toHaveBeenCalledWith({ "test input": "1000" });

    expect(calculateTotalMock).toHaveBeenCalledTimes(2);
    expect(calculateTotalMock).toHaveBeenCalledWith({ "test input": "1000" });
  });
  test("calls handleRemove when the remove button is clicked", () => {
    const removeBtn = screen.getByTestId("remove-button");
    fireEvent.click(removeBtn);

    expect(handleRemoveMock).toHaveBeenCalledTimes(1);
  });
});

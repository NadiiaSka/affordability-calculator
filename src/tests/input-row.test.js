import { render, fireEvent, screen } from "@testing-library/react";
import InputRow from "../components/InputRow";

const calculateTotalMock = jest.fn();
const setValuesMock = jest.fn();

const renderInputRow = (props = {}) => {
  const defaultProps = {
    labelText: "Test Input",
    name: "test input",
    values: {},
    setValues: setValuesMock,
    calculateTotal: calculateTotalMock,
    handleRemove: jest.fn(),
    type: "withDropDown",
  };
  return render(<InputRow {...defaultProps} {...props} />);
};

describe("InputRow Component", () => {
  test("renders input field and dropdown", () => {
    renderInputRow();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("calls setValues and calculateTotal on input change", () => {
    renderInputRow();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "123" },
    });

    expect(setValuesMock).toHaveBeenCalledWith({ "test input": "123" });
    expect(calculateTotalMock).toHaveBeenCalledWith({ "test input": "123" });
  });

  test("calls setValues and calculateTotal on dropdown change", () => {
    renderInputRow();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "perWeek" },
    });

    expect(setValuesMock).toHaveBeenCalledTimes(2);
    expect(calculateTotalMock).toHaveBeenCalledTimes(2);
  });

  test("calls handleRemove when remove button is clicked", () => {
    const handleRemoveMock = jest.fn();
    renderInputRow({ name: "otherIncome", handleRemove: handleRemoveMock });

    fireEvent.click(screen.getByTestId("remove-button"));
    expect(handleRemoveMock).toHaveBeenCalledTimes(1);
  });

  test("does not call handleRemove when name is salaryFirst", () => {
    const handleRemoveMock = jest.fn();
    renderInputRow({ name: "salaryFirst", handleRemove: handleRemoveMock });

    fireEvent.click(screen.getByTestId("remove-button"));
    expect(handleRemoveMock).not.toHaveBeenCalled();
  });
});

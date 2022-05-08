import { render, fireEvent, screen } from "@testing-library/react";
import DropDown from "../components/DropDown";

const handleOptionChangeMock = jest.fn();

beforeEach(() => {
  render(<DropDown handleOptionChange={handleOptionChangeMock} />);
});

describe("DropDown Component", () => {
  test("renders the dropdown with corresponding options", () => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "per year" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "per week" })
    ).toBeInTheDocument();
  });

  test("calls the handleOptionChange function when dropdown option changed", () => {
    const dropDown = screen.getByRole("combobox");
    fireEvent.change(dropDown, { target: { value: "per week" } });
    expect(handleOptionChangeMock).toHaveBeenCalledTimes(1);
  });
});

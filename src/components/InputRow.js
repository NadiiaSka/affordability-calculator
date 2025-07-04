import { useState } from "react";
import DropDown from "./DropDown";
import { NumericFormat } from "react-number-format";

const InputRow = ({
  labelText,
  name,
  values,
  setValues,
  calculateTotal,
  type,
  handleRemove,
  onEmptyFields = () => {},
}) => {
  const [isPerYear, setIsPerYear] = useState(true);
  const [currentName, setCurrentName] = useState();
  const [currentValue, setCurrentValue] = useState();
  const [localValue, setLocalValue] = useState("");

  const processValueChange = (name, value) => {
    let processedValue = isPerYear ? value : parseInt(value) * 52;
    setCurrentName(name);
    setCurrentValue(processedValue);
    const newValues = { ...values, [name]: processedValue };
    setValues(newValues);
    calculateTotal(newValues);
  };

  const handleOptionChange = (e) => {
    e.preventDefault();
    if (!currentName || !currentValue) return;

    if (e.target.value === "perWeek") {
      setIsPerYear(false);
      const weekValue = parseInt(currentValue) * 52;
      const newValues = {
        ...values,
        [currentName]: weekValue,
      };
      setValues(newValues);
      calculateTotal(newValues);
      setCurrentValue(weekValue);
    } else {
      setIsPerYear(true);
      const yearValue = parseInt(currentValue) / 52;
      const newValues = {
        ...values,
        [currentName]: yearValue,
      };
      setValues(newValues);
      calculateTotal(newValues);
      setCurrentValue(yearValue);
    }
  };

  const handleRemoveClick = () => {
    setLocalValue("");
    processValueChange(name, "0");
    if (
      name !== "salaryFirst" &&
      name !== "salarySecond" &&
      name !== "deposit"
    ) {
      handleRemove();
    }
    if (name === "salarySecond") {
      onEmptyFields();
    }
  };

  return (
    <div className="inputRow">
      <p>{labelText}</p>
      <span>$ </span>
      <NumericFormat
        name={name}
        value={localValue}
        className="input"
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        onValueChange={({ value }) => {
          setLocalValue(value);
          processValueChange(name, value);
        }}
      />
      {type === "withDropDown" && (
        <DropDown handleOptionChange={handleOptionChange} />
      )}{" "}
      <button
        className="btn-remove"
        onClick={handleRemoveClick}
        data-testid="remove-button"
      >
        &#10006;
      </button>
    </div>
  );
};

export default InputRow;

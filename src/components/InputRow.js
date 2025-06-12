import { useState, useRef } from "react";
import DropDown from "./DropDown";

const InputRow = ({
  labelText,
  name,
  values,
  setValues,
  calculateTotal,
  type,
}) => {
  const [isPerYear, setIsPerYear] = useState(true);
  const [currentName, setCurrentName] = useState();
  const [currentValue, setCurrentValue] = useState();
  const inputRef = useRef(null);

  const handleValueChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = isPerYear ? e.target.value : parseInt(e.target.value) * 52;
    setCurrentName(name);
    setCurrentValue(value);
    const newValues = { ...values, [name]: value };
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
    if (inputRef.current) inputRef.current.value = "";

    const newValues = { ...values };
    delete newValues[name];
    setValues(newValues);
    calculateTotal(newValues);

    setCurrentName(null);
    setCurrentValue(null);
  };

  return (
    <div className="inputRow">
      <p>{labelText}</p>
      <span>$ </span>
      <input
        type="number"
        name={name}
        className="input"
        onChange={handleValueChange}
        min="0"
        ref={inputRef}
      />
      {type === "withDropDown" && (
        <DropDown handleOptionChange={handleOptionChange} />
      )}
      <button className="btn-remove" onClick={handleRemoveClick}>
        &#10006;
      </button>
    </div>
  );
};

export default InputRow;

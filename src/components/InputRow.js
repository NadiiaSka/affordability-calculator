import { useState } from "react";

const InputRow = ({ labelText, name, values, setValues, calculateTotal }) => {
  const [isPerYear, setIsPerYear] = useState(true);
  const [currentName, setCurrentName] = useState();
  const [currentValue, setCurrentValue] = useState();

  const handleValueChange = (e) => {
    let name = e.target.name;
    let value = isPerYear ? e.target.value : parseInt(e.target.value) * 52;
    setCurrentName(name);
    setCurrentValue(value);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    calculateTotal(newValues);
  };

  const handleOptionChange = (e) => {
    if (e.target.value === "perWeek") {
      setIsPerYear(false);
      const weekValue = parseInt(currentValue) * 52;
      const newValues = {
        ...values,
        [currentName]: weekValue,
      };
      calculateTotal(newValues);
      setCurrentValue(weekValue);
    } else {
      setIsPerYear(true);
      const yearValue = parseInt(currentValue) / 52;
      const newValues = {
        ...values,
        [currentName]: yearValue,
      };
      calculateTotal(newValues);
      setCurrentValue(yearValue);
    }
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
      />
      <select className="dropDown" onChange={handleOptionChange}>
        <option value="perYear">per year</option>
        <option value="perWeek">per week</option>
      </select>
    </div>
  );
};

export default InputRow;

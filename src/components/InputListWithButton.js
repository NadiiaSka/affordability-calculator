import { useState } from "react";
import Button from "./Button";
import InputRow from "./InputRow";

const InputRowWithButton = ({ label, values, setValues, calculateTotal }) => {
  const [inputList, setInputList] = useState([{ amount: 0 }]);

  const handleAddInputField = () => {
    setInputList([...inputList, { amount: 0 }]);
    console.log(inputList);
  };

  return (
    <div>
      {inputList.map((singleInput, index) => {
        return (
          <InputRow
            key={index}
            labelText={`Other income #${index + 1}`}
            name="additionalIncome"
            values={values}
            setValues={setValues}
            calculateTotal={calculateTotal}
          />
        );
      })}
      <Button
        label={label}
        className="btn-add-more"
        handleButtonSelected={handleAddInputField}
      />
    </div>
  );
};

export default InputRowWithButton;

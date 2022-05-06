import { useState } from "react";
import Button from "./Button";
import InputRow from "./InputRow";

const InputList = ({ label, values, setValues, calculateTotal }) => {
  const [inputListLength, setInputListLength] = useState(1);

  const handleAddInputField = () => {
    setInputListLength(inputListLength + 1);
  };

  return (
    <div>
      {[...Array(inputListLength)].map((_, index) => {
        return (
          <InputRow
            key={index}
            labelText={`Other income #${index + 1}`}
            name={`additionalIncome${index}`}
            values={values}
            setValues={setValues}
            calculateTotal={calculateTotal}
          />
        );
      })}{" "}
      <Button
        label={label}
        className="btn-add-more"
        handleButtonSelected={handleAddInputField}
      />
    </div>
  );
};

export default InputList;

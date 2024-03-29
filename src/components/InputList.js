import { useState } from "react";
import Button from "./Button";
import InputRow from "./InputRow";

const InputList = ({
  inputLabel,
  buttonLabel,
  values,
  type,
  setValues,
  calculateTotal,
}) => {
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
            labelText={`${inputLabel} #${index + 1}`}
            name={`${inputLabel}${index}`}
            values={values}
            type={type}
            setValues={setValues}
            calculateTotal={calculateTotal}
          />
        );
      })}
      <Button
        label={buttonLabel}
        className="btn-add-more"
        handleButtonSelected={handleAddInputField}
      />
    </div>
  );
};

export default InputList;

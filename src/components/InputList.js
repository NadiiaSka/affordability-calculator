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
  const [inputFields, setInputFields] = useState(["0"]);

  const handleAddInputField = () => {
    setInputFields([...inputFields, Date.now().toString()]);
  };

  const handleRemoveField = (idToRemove) => {
    const nameToRemove = `${inputLabel}${idToRemove}`;
    const newValues = { ...values };
    delete newValues[nameToRemove];
    setValues(newValues);
    calculateTotal(newValues);
    const updatedFields = inputFields.filter((id) => id !== idToRemove);
    setInputFields(updatedFields);
  };

  return (
    <div>
      {inputFields.map((id, index) => {
        return (
          <InputRow
            key={id}
            id={id}
            labelText={`${inputLabel} #${index + 1}`}
            name={`${inputLabel}${id}`}
            values={values}
            type={type}
            setValues={setValues}
            calculateTotal={calculateTotal}
            handleRemove={() => handleRemoveField(id)}
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

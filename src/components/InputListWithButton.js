import { useState } from "react";
import Button from "./Button";
import InputRow from "./InputRow";

const InputRowWithButton = ({ label }) => {
  const [inputList, setInputList] = useState([{ amount: 0 }]);

  const handleAddInput = () => {
    setInputList([...inputList, { amount: 0 }]);
    console.log(inputList);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  return (
    <div>
      {inputList.map((singleInput, index) => {
        return (
          <InputRow
            key={index}
            name="amount"
            value={singleInput.amount}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      })}
      <Button
        label={label}
        className="btn-add-more"
        handleButtonSelected={handleAddInput}
      />
    </div>
  );
};

export default InputRowWithButton;

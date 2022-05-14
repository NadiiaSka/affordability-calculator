import { useState } from "react";
import Button from "./Button";

const ButtonRow = ({ buttonLabels, buttonSelected, setButtonSelected }) => {
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonSelected = (button) => () => {
    setSelectedButton(button.id);
    let { name, value } = button;
    const newValues = { ...buttonSelected, [name]: value };
    setButtonSelected(newValues);
  };

  return (
    <>
      {buttonLabels.map((button) => (
        <Button
          key={button.id}
          className={button.id === selectedButton ? "selected" : ""}
          label={button.label}
          handleButtonSelected={handleButtonSelected(button)}
        >
          {button.label}
        </Button>
      ))}
    </>
  );
};

export default ButtonRow;

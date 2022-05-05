import { useState } from "react";
import Button from "./Button";

const ButtonRow = ({ buttonLabels, setIsBuyingWithSomeone }) => {
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonSelected = (button) => () => {
    setSelectedButton(button.id);
    if (button.type === "firstStep" && button.id === 2) {
      setIsBuyingWithSomeone(true);
    }
    if (button.type === "firstStep" && button.id === 1) {
      setIsBuyingWithSomeone(false);
    }
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

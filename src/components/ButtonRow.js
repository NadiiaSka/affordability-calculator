import { useState } from "react";
import Button from "./Button";

const ButtonRow = ({
  buttonLabels,
  setIsBuyingWithSomeone,
  setIsOtherSourceOfIncome,
}) => {
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonSelected = (button) => () => {
    setSelectedButton(button.id);
    if (button.name === "salary" && button.id === 2) {
      setIsBuyingWithSomeone(true);
    }
    if (button.name === "salary" && button.id === 1) {
      setIsBuyingWithSomeone(false);
    }
    if (button.name === "otherSourceOfIncome" && button.id === 1) {
      setIsOtherSourceOfIncome(true);
    }
    if (button.name === "otherSourceOfIncome" && button.id === 2) {
      setIsOtherSourceOfIncome(false);
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

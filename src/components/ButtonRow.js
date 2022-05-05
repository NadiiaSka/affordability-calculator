import { useState } from "react";
import Button from "./Button";

const ButtonRow = () => {
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonSelected = (button) => () => {
    setSelectedButton(button);
  };

  return (
    <>
      {["Just me", "I'm buying with someone"].map((button) => (
        <Button
          key={button}
          className={button === selectedButton ? "selected" : ""}
          label={button}
          handleButtonSelected={handleButtonSelected(button)}
        >
          {button}
        </Button>
      ))}
    </>
  );
};

export default ButtonRow;

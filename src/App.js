import { useState } from "react";
import ButtonRow from "./components/ButtonRow";
import InputRow from "./components/InputRow";
import InputListWithButton from "./components/InputListWithButton";

function App() {
  const [isBuyingWithSomeone, setIsBuyingWithSomeone] = useState(false);
  const [isOtherSourceOfIncome, setIsOtherSourceOfIncome] = useState(false);

  return (
    <div className="Container">
      <h1>Calculator</h1>
      <p>How many of you are buying the property?</p>
      <ButtonRow
        buttonLabels={[
          { id: 1, type: "buyingAloneOrWithSomeone", label: "Just me" },
          {
            id: 2,
            type: "buyingAloneOrWithSomeone",
            label: "I'm buying with someone",
          },
        ]}
        setIsBuyingWithSomeone={setIsBuyingWithSomeone}
      />
      <p>What is your base salary/wages? (before tax)</p>
      <InputRow />
      {isBuyingWithSomeone && (
        <>
          <p>What's the second applicant's salary/wages? (before tax)</p>
          <InputRow />
        </>
      )}
      <p>Do you have any other source of income?</p>
      <ButtonRow
        buttonLabels={[
          { id: 1, type: "otherSourceOfIncome", label: "Yes" },
          { id: 2, type: "otherSourceOfIncome", label: "No" },
        ]}
        setIsOtherSourceOfIncome={setIsOtherSourceOfIncome}
      />
      {isOtherSourceOfIncome && (
        <>
          <p>Other income #1</p>
          <InputListWithButton label="Add other income" />
        </>
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import ButtonRow from "./components/ButtonRow";
import InputRow from "./components/InputRow";
import InputListWithButton from "./components/InputListWithButton";

function App() {
  const [isBuyingWithSomeone, setIsBuyingWithSomeone] = useState(false);
  const [isOtherSourceOfIncome, setIsOtherSourceOfIncome] = useState(false);
  let [totalIncome, setTotalIncome] = useState(0);
  const [values, setValues] = useState({
    salaryFirst: "",
    salarySecond: "",
    additionalIncome: "",
  });

  const calculateTotal = (newValues) => {
    const { salaryFirst, salarySecond, additionalIncome } = newValues;
    const newTotal =
      (salaryFirst && parseInt(salaryFirst)) +
      (salarySecond && parseInt(salarySecond)) +
      (additionalIncome && parseInt(additionalIncome));
    setTotalIncome(newTotal);
  };

  return (
    <>
      <header>
        <h1>Calculator</h1>
      </header>
      <main>
        <div className="formContainer">
          <p>How many of you are buying the property?</p>
          <ButtonRow
            buttonLabels={[
              { id: 1, name: "salary", label: "Just me" },
              {
                id: 2,
                name: "salary",
                label: "I'm buying with someone",
              },
            ]}
            setIsBuyingWithSomeone={setIsBuyingWithSomeone}
          />
          <p>What is your base salary/wages? (before tax)</p>
          <InputRow
            name="salaryFirst"
            values={values}
            setValues={setValues}
            calculateTotal={calculateTotal}
          />
          {isBuyingWithSomeone && (
            <>
              <p>What's the second applicant's salary/wages? (before tax)</p>
              <InputRow
                name="salarySecond"
                values={values}
                setValues={setValues}
                calculateTotal={calculateTotal}
              />
            </>
          )}
          <p>Do you have any other source of income?</p>
          <ButtonRow
            buttonLabels={[
              { id: 1, name: "otherSourceOfIncome", label: "Yes" },
              { id: 2, name: "otherSourceOfIncome", label: "No" },
            ]}
            setIsOtherSourceOfIncome={setIsOtherSourceOfIncome}
          />
          {isOtherSourceOfIncome && (
            <InputListWithButton
              label="Add other income"
              values={values}
              setValues={setValues}
              calculateTotal={calculateTotal}
            />
          )}
        </div>
        <div className="resultContainer">
          <p>Here's what you can borrow</p>
          <p>$</p>
          <p>Total income</p>
          <p>$ {totalIncome}</p>
        </div>
      </main>
    </>
  );
}

export default App;

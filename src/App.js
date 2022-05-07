import { useState } from "react";
import ButtonRow from "./components/ButtonRow";
import InputRow from "./components/InputRow";
import InputList from "./components/InputList";

function App() {
  const [isBuyingWithSomeone, setIsBuyingWithSomeone] = useState(false);
  const [isOtherSourceOfIncome, setIsOtherSourceOfIncome] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);

  const [incomeValues, setIncomeValues] = useState({});

  const calculateTotal = (newValues) => {
    const incomeArray = Object.values(newValues);
    const newTotal = incomeArray.reduce((accumulator, value) => {
      return accumulator + (value && parseInt(value));
    }, 0);
    setTotalIncome(newTotal);
  };

  return (
    <>
      <header>
        <h1>Affordability Calculator</h1>
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
            values={incomeValues}
            setValues={setIncomeValues}
            calculateTotal={calculateTotal}
          />
          {isBuyingWithSomeone && (
            <>
              <p>What's the second applicant's salary/wages? (before tax)</p>
              <InputRow
                name="salarySecond"
                values={incomeValues}
                setValues={setIncomeValues}
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
            <InputList
              label="Add other income"
              values={incomeValues}
              setValues={setIncomeValues}
              calculateTotal={calculateTotal}
            />
          )}
        </div>
        <div className="resultContainer">
          <p>Here's what you can borrow</p>
          <p>$ 0</p>
          <p>Total income</p>
          <p>$ {totalIncome}</p>
        </div>
      </main>
    </>
  );
}

export default App;

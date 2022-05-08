import { useState } from "react";
import ButtonRow from "./components/ButtonRow";
import InputRow from "./components/InputRow";
import InputList from "./components/InputList";

function App() {
  const [buttonSelected, setButtonSelected] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalLoan, setTotalLoan] = useState(0);
  const [totalCreditCards, setTotalCreditCard] = useState(0);

  // const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [incomeValues, setIncomeValues] = useState({});
  const [loanValues, setLoanValues] = useState({});

  const calculateTotal = (newValues) => {
    const incomeArray = Object.values(newValues);
    const newTotal = incomeArray.reduce((accumulator, value) => {
      return accumulator + (value && parseInt(value));
    }, 0);
    return newTotal;
  };

  const calculateTotalIncome = (newValues) => {
    setTotalIncome(calculateTotal(newValues));
  };
  const calculateTotalLoan = (newValues) => {
    setTotalLoan(calculateTotal(newValues));
  };
  const calculateTotalCreditCard = (newValues) => {
    setTotalCreditCard(calculateTotal(newValues));
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
              { id: 1, name: "secondSalary", label: "Just me", value: false },
              {
                id: 2,
                name: "secondSalary",
                label: "I'm buying with someone",
                value: true,
              },
            ]}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
          />
          <p>What is your base salary/wages? (before tax)</p>
          <InputRow
            name="salaryFirst"
            values={incomeValues}
            setValues={setIncomeValues}
            calculateTotal={calculateTotalIncome}
          />
          {buttonSelected.secondSalary && (
            <>
              <p>What's the second applicant's salary/wages? (before tax)</p>
              <InputRow
                name="salarySecond"
                values={incomeValues}
                setValues={setIncomeValues}
                calculateTotal={calculateTotalIncome}
              />
            </>
          )}
          <p>Do you have any other source of income?</p>
          <ButtonRow
            buttonLabels={[
              { id: 1, name: "otherSourceOfIncome", label: "Yes", value: true },
              { id: 2, name: "otherSourceOfIncome", label: "No", value: false },
            ]}
            setButtonSelected={setButtonSelected}
            buttonSelected={buttonSelected}
          />
          {buttonSelected.otherSourceOfIncome && (
            <InputList
              inputLabel="Other income"
              buttonLabel="Add other income"
              values={incomeValues}
              setValues={setIncomeValues}
              calculateTotal={calculateTotalIncome}
            />
          )}
          <p>Do you have any loans?</p>
          <ButtonRow
            buttonLabels={[
              { id: 1, name: "loans", label: "Yes", value: true },
              { id: 2, name: "loans", label: "No", value: false },
            ]}
            setButtonSelected={setButtonSelected}
            buttonSelected={buttonSelected}
          />
          {buttonSelected.loans && (
            <InputList
              inputLabel="Loan"
              buttonLabel="Add loan"
              values={loanValues}
              setValues={setLoanValues}
              calculateTotal={calculateTotalLoan}
            />
          )}
          <p>Do you have any credit cards?</p>
          <ButtonRow
            buttonLabels={[
              { id: 1, name: "creditCards", label: "Yes", value: true },
              { id: 2, name: "creditCards", label: "No", value: false },
            ]}
            setButtonSelected={setButtonSelected}
            buttonSelected={buttonSelected}
          />
          {buttonSelected.creditCards && (
            <InputList
              inputLabel="Credit card"
              buttonLabel="Add credit card"
              values={incomeValues}
              setValues={setIncomeValues}
              calculateTotal={calculateTotalCreditCard}
            />
          )}
        </div>
        <div className="resultContainer">
          <p>Here's what you can borrow</p>
          <p>$ 0</p>
          <p>Total income</p>
          <p>$ {totalIncome}</p>
          <p>Total loans</p>
          <p>$ {totalLoan}</p>
          <p>Total credit cards</p>
          <p>$ {totalCreditCards}</p>
        </div>
      </main>
    </>
  );
}

export default App;

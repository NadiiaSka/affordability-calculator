import { useState } from "react";
import ButtonRow from "./components/ButtonRow";
import InputRow from "./components/InputRow";
import InputList from "./components/InputList";
import mainImage from "./assets/images/house.svg";
import CurrencyFormat from "react-currency-format";
import fetchResult from "./api/fetchResult";

function App() {
  const [buttonSelected, setButtonSelected] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalLoan, setTotalLoan] = useState(0);
  const [totalCreditCards, setTotalCreditCard] = useState(0);
  const [loanValues, setLoanValues] = useState({});
  const [incomeValues, setIncomeValues] = useState({});
  const [creditCardValues, setCreditCardValues] = useState({});
  const [depositValue, setDepositValue] = useState(0);

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
  const calculateTotalDeposit = (newValues) => {
    setDepositValue(calculateTotal(newValues));
  };

  const handleApiCall = async () => {
    const result = await fetchResult();
    console.log(result);
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
            type="withDropDown"
            values={incomeValues}
            setValues={setIncomeValues}
            calculateTotal={calculateTotalIncome}
          />
          {buttonSelected.secondSalary && (
            <>
              <p>What's the second applicant's salary/wages? (before tax)</p>
              <InputRow
                name="salarySecond"
                type="withDropDown"
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
              type="withDropDown"
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
              values={creditCardValues}
              setValues={setCreditCardValues}
              calculateTotal={calculateTotalCreditCard}
            />
          )}
          <p>How much deposit do you have?</p>
          <InputRow
            name="deposit"
            values={depositValue}
            setValues={setDepositValue}
            calculateTotal={calculateTotalDeposit}
          />
          <div>
            <button style={{ marginTop: "1rem" }} onClick={handleApiCall}>
              test API
            </button>
          </div>
        </div>
        <div className="resultContainer">
          {depositValue > 0 && (
            <>
              <p>
                With you deposit of ${depositValue} you could afford a property
                up to $725,000
              </p>
            </>
          )}

          <p>Total income</p>
          <CurrencyFormat
            value={totalIncome}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
          {totalLoan > 0 && (
            <>
              <p>Total loans</p>
              <CurrencyFormat
                value={totalLoan}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </>
          )}
          {totalCreditCards > 0 && (
            <>
              <p>Total credit cards</p>
              <CurrencyFormat
                value={totalCreditCards}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </>
          )}
        </div>
        <div className="imageContainer">
          <img src={mainImage} alt="house" className="img" />
        </div>
      </main>
    </>
  );
}

export default App;

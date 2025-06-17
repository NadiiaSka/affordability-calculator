import { useState, useEffect, useCallback } from "react";
import ButtonRow from "./components/ButtonRow";
import InputRow from "./components/InputRow";
import InputList from "./components/InputList";
import mainImage from "./assets/images/house.svg";
import { NumericFormat } from "react-number-format";
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
  const [borrowing, setBorrowing] = useState(0);
  const [propertyPrice, setPropertyPrice] = useState(0);

  const calculateTotal = (newValues) => {
    // Convert values to an array, replacing empty strings with 0
    const incomeArray = Object.values(newValues).map((value) =>
      value === "" ? 0 : parseInt(value)
    );
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

  const fetchData = useCallback(async () => {
    const response = await fetchResult(
      totalIncome,
      totalCreditCards,
      totalLoan,
      depositValue
    );
    setBorrowing(response.borrowing);
    setPropertyPrice(response.property_price);
  }, [totalIncome, totalCreditCards, totalLoan, depositValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchData]);

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
        </div>
        <div className="resultContainer">
          <p>Here's what you can borrow</p>
          <NumericFormat
            value={borrowing}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
          {depositValue > 0 && (
            <p>
              With a deposit of{" "}
              <NumericFormat
                value={depositValue}
                displayType="text"
                thousandSeparator
                prefix="$"
              />{" "}
              you could afford a property up to{"  "}
              <NumericFormat
                value={propertyPrice}
                displayType="text"
                thousandSeparator
                prefix="$"
              />
            </p>
          )}
          <p>Total income</p>
          <NumericFormat
            value={totalIncome}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
          {totalLoan > 0 && (
            <>
              <p>Total loans</p>
              <NumericFormat
                value={totalLoan}
                displayType="text"
                thousandSeparator
                prefix="$"
              />
            </>
          )}
          {totalCreditCards > 0 && (
            <>
              <p>Total credit cards</p>
              <NumericFormat
                value={totalCreditCards}
                displayType="text"
                thousandSeparator
                prefix="$"
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

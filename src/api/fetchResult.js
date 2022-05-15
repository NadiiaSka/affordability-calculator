const fetchResult = async (
  totalIncome,
  totalCreditCards,
  totalLoan,
  deposit
) => {
  const payload = {
    total_income: parseInt(totalIncome),
    total_liabilities: parseInt(totalCreditCards) + parseInt(totalLoan),
    deposit: parseInt(deposit),
  };
  try {
    const response = await fetch(
      `https://react-dev-test-api.vercel.app/api/test`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default fetchResult;

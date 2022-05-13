const fetchResult = async (
  totalIncome,
  totalCreditCards,
  totalLoan,
  deposit
) => {
  const totalLiabilities = parseInt(totalCreditCards) + parseInt(totalLoan);
  try {
    const response = await fetch(
      `https://react-dev-test-api.vercel.app/api/test`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total_income: totalIncome,
          total_liabilities: totalLiabilities,
          deposit: deposit,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default fetchResult;

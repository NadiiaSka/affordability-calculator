const fetchResult = async () => {
  try {
    const response = await fetch(
      `https://react-dev-test-api.vercel.app/api/test/checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total_income: 150000,
          total_liabilities: 20000,
          deposit: 100000,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default fetchResult;

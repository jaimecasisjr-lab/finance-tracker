export function filterTransactionsByPeriod(
  transactions,
  timePeriod
) {
  const now = new Date();

  return transactions.filter((transaction) => {
    const transactionDate = new Date(
      transaction.date
    );

    if (Number.isNaN(transactionDate.getTime())) {
      return false;
    }

    if (timePeriod === 'all') {
      return true;
    }

    if (timePeriod === 'this-month') {
      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
      );
    }

    if (timePeriod === 'last-month') {
      const lastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );

      return (
        transactionDate.getMonth() === lastMonth.getMonth() &&
        transactionDate.getFullYear() === lastMonth.getFullYear()
      );
    }

    if (timePeriod === 'this-year') {
      return (
        transactionDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });
}
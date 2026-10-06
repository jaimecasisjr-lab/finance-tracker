import { useMemo } from 'react';

import { useTransactions } from '../context/TransactionContext';

export default function Analytics() {
  const { transactions } = useTransactions();

  const analytics = useMemo(() => {
    const totalIncome = transactions
      .filter(
        (transaction) =>
          transaction.type === 'income'
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    const totalExpenses = transactions
      .filter(
        (transaction) =>
          transaction.type === 'expense'
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    const expenseTransactions = transactions.filter(
      (transaction) =>
        transaction.type === 'expense'
    );

    const averageExpense =
      expenseTransactions.length > 0
        ? totalExpenses /
          expenseTransactions.length
        : 0;

    const biggestExpense =
      expenseTransactions.length > 0
        ? Math.max(
            ...expenseTransactions.map(
              (transaction) =>
                transaction.amount
            )
          )
        : 0;

    return {
      totalIncome,
      totalExpenses,
      averageExpense,
      biggestExpense,
    };
  }, [transactions]);

  return (
    <div className="dashboard-analytics">

      <h2>Financial Analytics</h2>

      <div className="dashboard-analytics-grid">

        <div className="dashboard-analytics-card">
          <h4 className="analytics-card-title">
            Total Income
          </h4>

          <p className="analytics-income">
            +${analytics.totalIncome.toLocaleString()}
          </p>
        </div>

        <div className="dashboard-analytics-card">
          <h4 className="analytics-card-title">
            Total Expenses
          </h4>

          <p className="analytics-expense">
            -${analytics.totalExpenses.toLocaleString()}
          </p>
        </div>

        <div className="dashboard-analytics-card">
          <h4 className="analytics-card-title">
            Average Expense
          </h4>

          <p className="analytics-income">
            ${analytics.averageExpense.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        <div className="dashboard-analytics-card">
          <h4 className="analytics-card-title">
            Biggest Expense
          </h4>

          <p className="analytics-expense">
            ${analytics.biggestExpense.toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
}
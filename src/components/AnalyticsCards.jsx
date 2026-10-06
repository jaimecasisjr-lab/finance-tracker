import { useMemo } from 'react';

import { useTransactions } from '../context/TransactionContext';

import {
  filterTransactionsByPeriod
} from '../utils/transactionFilters';

export default function AnalyticsCards({ timePeriod }) {
  const { transactions } = useTransactions();

  const filteredTransactions = useMemo(
    () =>
      filterTransactionsByPeriod(
        transactions,
        timePeriod
      ),
    [transactions, timePeriod]
  );

  const analytics = useMemo(() => {
    const expenses = filteredTransactions.filter(
      (transaction) =>
        transaction.type === 'expense'
    );

    const income = filteredTransactions.filter(
      (transaction) =>
        transaction.type === 'income'
    );

    const totalExpenses = expenses.reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

    const totalIncome = income.reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

    const netCashFlow =
      totalIncome - totalExpenses;

    const savingsRate =
      totalIncome > 0
        ? (netCashFlow / totalIncome) * 100
        : 0;

    const averageExpense =
      expenses.length > 0
        ? totalExpenses / expenses.length
        : 0;

    const biggestExpense =
      expenses.length > 0
        ? Math.max(
            ...expenses.map(
              (transaction) =>
                transaction.amount
            )
          )
        : 0;

    return {
      averageExpense,
      biggestExpense,
      totalIncome,
      netCashFlow,
      savingsRate,
      transactionCount:
        filteredTransactions.length,
      hasExpenses: expenses.length > 0,
    };
  }, [filteredTransactions]);

  return (
    <div className="analytics-grid">

      <article className="analytics-card">
        <span>Average Expense</span>

        <strong>
          {analytics.hasExpenses
            ? `$${analytics.averageExpense.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`
            : 'No expenses'}
        </strong>
      </article>

      <article className="analytics-card">
        <span>Biggest Expense</span>

        <strong className="expense">
          {analytics.hasExpenses
            ? `$${analytics.biggestExpense.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`
            : 'No expenses'}
        </strong>
      </article>

      <article className="analytics-card">
        <span>Total Transactions</span>

        <strong>
          {analytics.transactionCount}
        </strong>
      </article>

      <article className="analytics-card">
        <span>Net Cash Flow</span>

        <strong>
          {analytics.netCashFlow < 0
            ? `-$${Math.abs(
                analytics.netCashFlow
              ).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`
            : `$${analytics.netCashFlow.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`}
        </strong>
      </article>

      <article className="analytics-card">
        <span>Savings Rate</span>

        <strong>
          {analytics.savingsRate.toFixed(2)}%
        </strong>
      </article>

    </div>
  );
}
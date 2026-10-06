import { useMemo } from 'react';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

import { useTransactions } from '../context/TransactionContext';

import {
  filterTransactionsByPeriod
} from '../utils/transactionFilters';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ExpensesByCategoryChart({
  timePeriod,
}) {
  const { transactions } = useTransactions();

  const categoryTotals = useMemo(() => {
    const filteredTransactions =
      filterTransactionsByPeriod(
        transactions,
        timePeriod
      );

    const totals = {};

    filteredTransactions
      .filter(
        (transaction) =>
          transaction.type === 'expense'
      )
      .forEach((transaction) => {
        const category = transaction.category;

        if (!totals[category]) {
          totals[category] = 0;
        }

        totals[category] += Number(
          transaction.amount
        );
      });

    return totals;
  }, [transactions, timePeriod]);

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const data = {
    labels: categories,

    datasets: [
      {
        data: amounts,

        backgroundColor: [
          '#3182ce',
          '#38a169',
          '#e53e3e',
          '#dd6b20',
          '#805ad5',
          '#d53f8c',
          '#319795',
          '#718096',
        ],

        borderWidth: 1,
      },
    ],
  };

  if (categories.length === 0) {
    return (
      <div className="chart-card">
        <h2>Expenses by Category</h2>

        <p>
          No expense transactions available.
        </p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h2>Expenses by Category</h2>

      <Doughnut data={data} />
    </div>
  );
}
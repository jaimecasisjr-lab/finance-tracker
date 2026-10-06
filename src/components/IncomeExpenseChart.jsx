import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

import { useTransactions } from '../context/TransactionContext';
import {filterTransactionsByPeriod} from '../utils/transactionFilters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function IncomeExpenseChart({ timePeriod }) {
  const { transactions } = useTransactions();

  const filteredTransactions = filterTransactionsByPeriod(
    transactions,
    timePeriod
  );

  const totalIncome = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const totalExpenses = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const data = {
    labels: ['Income', 'Expenses'],

    datasets: [
      {
        label: 'Amount',
        data: [
          totalIncome,
          totalExpenses,
        ],
        backgroundColor: [
          '#38a169',
          '#e53e3e',
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-card">
      <h2>Income vs Expenses</h2>

      <div className="chart-container">
        <Bar
          data={data}
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                display: false,
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
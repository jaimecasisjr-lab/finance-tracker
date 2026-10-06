// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import ChartJS from 'chart.js/auto';
import axios from 'axios';

export default function TransactionChart({ transactions }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Income',
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        borderWidth: 1,
        data: [],
      },
      {
        label: 'Expenses',
        backgroundColor: '#e53e3e',
        borderColor: '#e53e3e',
        borderWidth: 1,
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Fetch transactions from the API
    axios.get('/api/transactions')
      .then(response => {
        const labels = response.data.map(transaction => transaction.date);
        const datasets = [
          {
            label: 'Income',
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            borderWidth: 1,
            data: response.data.filter(transaction => transaction.category === 'Income').map(transaction => transaction.amount),
          },
          {
            label: 'Expenses',
            backgroundColor: '#e53e3e',
            borderColor: '#e53e3e',
            borderWidth: 1,
            data: response.data.filter(transaction => transaction.category === 'Expense').map(transaction => transaction.amount),
          },
        ];
        setChartData({ labels, datasets });
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, [transactions]);

  // Render the chart
  return (
    <canvas ref={ref} />
  );
}
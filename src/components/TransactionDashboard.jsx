// Import necessary libraries and components
import React from 'react';
import axios from 'axios';

export default function TransactionDashboard({ transactions }) {
  const [totalSpent, setTotalSpent] = useState(0);
  const [averageTransactionValue, setAverageTransactionValue] = useState(0);
  const [topSpendingCategories, setTopSpendingCategories] = useState([]);

  useEffect(() => {
    // Fetch transactions from the API
    axios.get('/api/transactions')
      .then(response => {
        const totalAmount = response.data.reduce((acc, transaction) => acc + transaction.amount, 0);
        const averageValue = totalAmount / response.data.length;
        const topCategories = response.data.reduce((acc, transaction) => {
          if (!acc[transaction.category]) {
            acc[transaction.category] = 0;
          }
          acc[transaction.category]++;
          return acc;
        }, {});
        setTotalSpent(totalAmount);
        setAverageTransactionValue(averageValue);
        const sortedCategories = Object.entries(topCategories).sort((a, b) => b[1] - a[1]).slice(0, 3);
        setTopSpendingCategories(sortedCategories.map(([category]) => category));
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, [transactions]);

  // Render the dashboard
  return (
    <div className="TransactionDashboard">
      <h2>Summary</h2>
      <p>Total Spent: ${totalSpent.toFixed(2)}</p>
      <p>Average Transaction Value: $${averageTransactionValue.toFixed(2)}</p>
      <h3>Top Spending Categories</h3>
      <ul>
        {topSpendingCategories.map(category => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
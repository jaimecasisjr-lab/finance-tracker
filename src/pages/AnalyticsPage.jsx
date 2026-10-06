import { useState } from 'react';

import AnalyticsCards from '../components/AnalyticsCards';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import ExpensesByCategoryChart from '../components/ExpensesCategoryByChart';

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState('all');

  return (
    <section className="page-container">

      <div className="page-header">
        <h1>Financial Analytics</h1>

        <p>
          Understand your income and spending patterns.
        </p>
      </div>

      <div className="analytics-filter">
        <select
          value={timePeriod}
          onChange={(event) =>
            setTimePeriod(event.target.value)
          }
        >
          <option value="all">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
        </select>
      </div>

      <AnalyticsCards timePeriod={timePeriod} />

      <div className="analytics-chart-grid">
        <IncomeExpenseChart timePeriod={timePeriod} />
        <ExpensesByCategoryChart timePeriod={timePeriod} />
      </div>

    </section>
  );
}
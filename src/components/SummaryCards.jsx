import { useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';

export default function SummaryCards() {
  const { transactions } = useTransactions();

  const summary = useMemo(() => {
    const income = transactions
      .filter(
        (transaction) =>
          transaction.type === 'income'
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    const expenses = transactions
      .filter(
        (transaction) =>
          transaction.type === 'expense'
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <div className="summary-grid">

      <SummaryCard
        title="Total Balance"
        value={summary.balance}
        type={
          summary.balance >= 0
            ? 'balance-positive'
            : 'balance-negative'
        }
      />

      <SummaryCard
        title="Income"
        value={summary.income}
        type="income"
        prefix="+"
      />

      <SummaryCard
        title="Expenses"
        value={summary.expenses}
        type="expense"
        prefix="-"
      />

    </div>
  );
}

function SummaryCard({
  title,
  value,
  type,
  prefix = '',
}) {
  return (
    <article className="summary-card">
      <h3>{title}</h3>

      <p className={`summary-value ${type}`}>
        {prefix}${value.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}
      </p>
    </article>
  );
}
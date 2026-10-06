import {
  useState,
} from 'react';

import {
  formatTransactionDate,
} from '../utils/dateUtils';

export default function TransactionTable({
  transactions,
  isLoading,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const [deleteError, setDeleteError] =
    useState('');

  if (isLoading) {
    return (
      <div className="empty-state">
        <h3>Loading transactions...</h3>

        <p>
          Please wait while your transactions are
          being loaded.
        </p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No transactions found</h3>

        <p>
          Try changing your filters or add a new
          transaction.
        </p>
      </div>
    );
  }

  const handleDelete = async (transaction) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${transaction.description}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeleteError('');

    try {
      await onDeleteTransaction(transaction.id);
    } catch (error) {
      setDeleteError(
        'Failed to delete transaction. Please try again.'
      );
    }
  };

  return (
    <div>
      {deleteError && (
        <div className="empty-state">
          <h3>Unable to delete transaction</h3>

          <p>{deleteError}</p>
        </div>
      )}

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const isExpense =
                transaction.type === 'expense';

              return (
                <tr key={transaction.id}>
                  <td>
                    {formatTransactionDate(
                      transaction.date
                    )}
                  </td>

                  <td>
                    {transaction.description}
                  </td>

                  <td>
                    <span className="category-badge">
                      {transaction.category}
                    </span>
                  </td>

                  <td className="capitalize">
                    {transaction.type}
                  </td>

                  <td
                    className={
                      isExpense
                        ? 'amount expense'
                        : 'amount income'
                    }
                  >
                    {isExpense ? '-' : '+'}$
                    {transaction.amount.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="button button-edit"
                        onClick={() =>
                          onEditTransaction(
                            transaction
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="button button-danger"
                        onClick={() =>
                          handleDelete(transaction)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
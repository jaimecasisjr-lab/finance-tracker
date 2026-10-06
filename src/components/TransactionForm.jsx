import { useEffect, useState } from 'react';

import {
  validateTransaction,
} from '../utils/transactionValidation';

import {
  TRANSACTION_CATEGORIES,
} from '../utils/transactionConstants';

const EMPTY_FORM = {
  description: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
  category: 'Food',
};

export default function TransactionForm({
  onSubmit,
  editingTransaction,
  onCancelEdit,
}) {
  const [formData, setFormData] =
    useState(EMPTY_FORM);

  const [error, setError] = useState('');

  useEffect(() => {
    if (!editingTransaction) {
      setFormData({
        ...EMPTY_FORM,
        date: new Date()
          .toISOString()
          .split('T')[0],
      });

      setError('');
      return;
    }

    setFormData({
      description:
        editingTransaction.description,

      amount:
        editingTransaction.amount,

      date:
        editingTransaction.date,

      type:
        editingTransaction.type,

      category:
        editingTransaction.category,
    });

    setError('');
  }, [editingTransaction]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transaction = {
      id:
        editingTransaction?.id ??
        Date.now(),

      date:
        formData.date,

      description:
        formData.description.trim(),

      amount:
        Number(formData.amount),

      type:
        formData.type,

      category:
        formData.category,
    };

    const validationError =
      validateTransaction(transaction);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await onSubmit(transaction);
    } catch (error) {
      setError(error.message);
      return;
    }

    if (!editingTransaction) {
      setFormData({
        ...EMPTY_FORM,
        date: new Date()
          .toISOString()
          .split('T')[0],
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="transaction-form"
    >

      {/* DESCRIPTION */}

      <div className="form-group description-group">
        <label htmlFor="description">
          Description
        </label>

        <input
          id="description"
          name="description"
          type="text"
          placeholder="e.g. Groceries"
          value={formData.description}
          onChange={handleChange}
          maxLength={100}
          className="form-input"
        />
      </div>

      {/* AMOUNT */}

      <div className="form-group">
        <label htmlFor="amount">
          Amount
        </label>

        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="0.00"
          value={formData.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          className="form-input"
        />
      </div>

      {/* DATE */}

      <div className="form-group">
        <label htmlFor="date">
          Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      {/* TYPE */}

      <div className="form-group">
        <label htmlFor="type">
          Type
        </label>

        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-input"
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>
      </div>

      {/* CATEGORY */}

      <div className="form-group">
        <label htmlFor="category">
          Category
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-input"
        >
          {TRANSACTION_CATEGORIES.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>
      </div>

      {/* ERROR */}

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {/* ACTIONS */}

      <div className="form-actions">

        <button
          type="submit"
          className="button button-primary"
        >
          {editingTransaction
            ? 'Update Transaction'
            : 'Add Transaction'}
        </button>

        {editingTransaction && (
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}
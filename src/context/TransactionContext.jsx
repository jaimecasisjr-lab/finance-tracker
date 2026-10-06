import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAuth } from './AuthContext';

import {
  validateTransaction,
} from '../utils/transactionValidation';

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const {
    token,
    handleTokenExpiration,
  } = useAuth();

  // =========================
  // TRANSACTION STATE
  // =========================

  const [transactions, setTransactions] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  // =========================
  // EDIT STATE
  // =========================

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  // =========================
  // FILTER STATE
  // =========================

  const [searchTerm, setSearchTerm] =
    useState('');

  const [typeFilter, setTypeFilter] =
    useState('all');

  const [categoryFilter, setCategoryFilter] =
    useState('all');

  // =========================
  // LOAD TRANSACTIONS
  // =========================

  useEffect(() => {
    if (!token) {
      setTransactions([]);
      setIsLoading(false);
      setError('');
      return;
    }

    async function fetchTransactions() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          'http://localhost:5000/api/transactions',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // JWT is invalid or expired
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          handleTokenExpiration();
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              'Failed to fetch transactions'
          );
        }

        const validTransactions =
          data.filter(
            (transaction) =>
              validateTransaction(transaction) ===
              null
          );

        setTransactions(validTransactions);

      } catch (error) {
        console.error(
          'Failed to load transactions:',
          error
        );

        setError(
          'Failed to load transactions. Please try again.'
        );

      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, [
    token,
    handleTokenExpiration,
  ]);

  // =========================
  // ADD TRANSACTION
  // =========================

  const handleAddTransaction = async (
    newTransaction
  ) => {
    const validationError =
      validateTransaction(newTransaction);

    if (validationError) {
      console.error(
        'Invalid transaction:',
        validationError
      );

      throw new Error(validationError);
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/transactions',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(
            newTransaction
          ),
        }
      );

      const data = await response.json();

      // JWT is invalid or expired
      if (
        response.status === 401 ||
        response.status === 403
      ) {
        handleTokenExpiration();

        throw new Error(
          'Your session has expired. Please log in again.'
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to add transaction'
        );
      }

      const savedTransaction = {
        ...newTransaction,
        id: data.id,
      };

      setTransactions(
        (previousTransactions) => [
          ...previousTransactions,
          savedTransaction,
        ]
      );

    } catch (error) {
      console.error(
        'Failed to add transaction:',
        error
      );

      throw error;
    }
  };

  // =========================
  // DELETE TRANSACTION
  // =========================

  const handleDeleteTransaction = async (
    id
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      // JWT is invalid or expired
      if (
        response.status === 401 ||
        response.status === 403
      ) {
        handleTokenExpiration();

        throw new Error(
          'Your session has expired. Please log in again.'
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to delete transaction'
        );
      }

      setTransactions(
        (previousTransactions) =>
          previousTransactions.filter(
            (transaction) =>
              transaction.id !== id
          )
      );

      if (editingTransaction?.id === id) {
        setEditingTransaction(null);
      }

    } catch (error) {
      console.error(
        'Failed to delete transaction:',
        error
      );

      throw error;
    }
  };

  // =========================
  // START EDITING
  // =========================

  const handleEditTransaction = (
    transaction
  ) => {
    setEditingTransaction(transaction);
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  // =========================
  // UPDATE TRANSACTION
  // =========================

  const handleUpdateTransaction = async (
    updatedTransaction
  ) => {
    const validationError =
      validateTransaction(
        updatedTransaction
      );

    if (validationError) {
      console.error(
        'Invalid transaction:',
        validationError
      );

      throw new Error(validationError);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${updatedTransaction.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(
            updatedTransaction
          ),
        }
      );

      const data = await response.json();

      // JWT is invalid or expired
      if (
        response.status === 401 ||
        response.status === 403
      ) {
        handleTokenExpiration();

        throw new Error(
          'Your session has expired. Please log in again.'
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to update transaction'
        );
      }

      setTransactions(
        (previousTransactions) =>
          previousTransactions.map(
            (transaction) =>
              transaction.id ===
              updatedTransaction.id
                ? updatedTransaction
                : transaction
          )
      );

      setEditingTransaction(null);

    } catch (error) {
      console.error(
        'Failed to update transaction:',
        error
      );

      throw error;
    }
  };

  // =========================
  // FILTERED TRANSACTIONS
  // =========================

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const matchesSearch =
          transaction.description
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesType =
          typeFilter === 'all' ||
          transaction.type === typeFilter;

        const matchesCategory =
          categoryFilter === 'all' ||
          transaction.category ===
            categoryFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesCategory
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.date) -
          new Date(a.date)
        );
      });
  }, [
    transactions,
    searchTerm,
    typeFilter,
    categoryFilter,
  ]);

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    transactions,
    filteredTransactions,
    isLoading,
    error,

    editingTransaction,

    searchTerm,
    setSearchTerm,

    typeFilter,
    setTypeFilter,

    categoryFilter,
    setCategoryFilter,

    handleAddTransaction,
    handleDeleteTransaction,
    handleEditTransaction,
    handleCancelEdit,
    handleUpdateTransaction,
  };

  return (
    <TransactionContext.Provider
      value={value}
    >
      {children}
    </TransactionContext.Provider>
  );
}

// =========================
// CUSTOM HOOK
// =========================

export function useTransactions() {
  const context =
    useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'useTransactions must be used inside TransactionProvider'
    );
  }

  return context;
}
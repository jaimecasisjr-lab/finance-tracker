import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import TransactionFilters from '../components/TransactionFilters';
import { useTransactions } from '../context/TransactionContext';

export default function Transactions() {
  const {
    transactions,
    isLoading,
    error,
    editingTransaction,
    handleAddTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
    handleEditTransaction,
    handleCancelEdit,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
  } = useTransactions();

  const filteredTransactions = transactions.filter(
    (transaction) => {
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
        transaction.category === categoryFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      );
    }
  );

  return (
    <section className="page-container">
      <div className="page-header">
        <h1>Transactions</h1>

        <p>
          Manage your income and expenses.
        </p>
      </div>

      <TransactionForm
        onSubmit={
          editingTransaction
            ? handleUpdateTransaction
            : handleAddTransaction
        }
        editingTransaction={editingTransaction}
        onCancelEdit={handleCancelEdit}
      />

      <TransactionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {error ? (
        <div className="empty-state">
          <h3>Unable to load transactions</h3>

          <p>{error}</p>
        </div>
      ) : (
        <TransactionTable
          transactions={filteredTransactions}
          isLoading={isLoading}
          onDeleteTransaction={
            handleDeleteTransaction
          }
          onEditTransaction={
            handleEditTransaction
          }
        />
      )}
    </section>
  );
}
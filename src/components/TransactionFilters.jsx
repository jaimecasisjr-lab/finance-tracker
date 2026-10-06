const CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Shopping',
  'Entertainment',
  'Health',
  'Education',
  'Salary',
  'Other',
];

export default function TransactionFilters({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div className="filters">

      <input
        type="search"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
        maxLength={100}
        className="form-input search-input"
      />

      <select
        value={typeFilter}
        onChange={(event) =>
          setTypeFilter(event.target.value)
        }
        className="form-input"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(event) =>
          setCategoryFilter(event.target.value)
        }
        className="form-input"
      >
        <option value="all">All Categories</option>

        {CATEGORIES.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="button button-secondary"
        onClick={handleClearFilters}
      >
        Clear
      </button>

    </div>
  );
}
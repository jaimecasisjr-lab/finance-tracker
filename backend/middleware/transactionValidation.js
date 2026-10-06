const ALLOWED_CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Shopping',
  'Entertainment',
  'Health',
  'Education',
  'Salary',
  'Other'
  ,
];

function validateTransaction(req, res, next) {
  const {
    date,
    description,
    amount,
    type,
    category,
  } = req.body;

  // Check required fields
  if (
    !date ||
    !description ||
    amount === undefined ||
    !type ||
    !category
  ) {
    return res.status(400).json({
      message: 'All transaction fields are required',
    });
  }

  // Check date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      message: 'Date must be in YYYY-MM-DD format',
    });
  }

  // Check description
  if (
    typeof description !== 'string' ||
    !/[a-zA-Z0-9]/.test(description)
  ) {
    return res.status(400).json({
      message:
        'Description must contain letters or numbers',
    });
  }

  if (description.trim().length > 100) {
    return res.status(400).json({
      message:
        'Description must be 100 characters or less',
    });
  }

  // Check transaction type
  if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({
      message: 'Invalid transaction type',
    });
  }

  // Check category
  if (!ALLOWED_CATEGORIES.includes(category)) {
    return res.status(400).json({
      message: 'Invalid transaction category',
    });
  }

  // Check amount
  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return res.status(400).json({
      message: 'Amount must be a positive number',
    });
  }

  // Check decimal places
  if (!Number.isInteger(amount * 100)) {
    return res.status(400).json({
      message:
        'Amount can have a maximum of 2 decimal places',
    });
  }

  next();
}

module.exports = validateTransaction;
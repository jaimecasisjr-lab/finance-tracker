import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from './transactionConstants';

export function validateTransaction(transaction) {
  const description =
    transaction.description?.trim();

  const amount = Number(transaction.amount);

  const transactionDate =
    new Date(transaction.date);

  if (!description) {
    return 'Description is required.';
  }

  if (description.length > 100) {
    return 'Description must be 100 characters or less.';
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Amount must be greater than zero.';
  }

  if (
    !transaction.date ||
    Number.isNaN(transactionDate.getTime())
  ) {
    return 'Invalid transaction date.';
  }

  if (
    !TRANSACTION_TYPES.includes(
      transaction.type
    )
  ) {
    return 'Invalid transaction type.';
  }

  if (
    !TRANSACTION_CATEGORIES.includes(
      transaction.category
    )
  ) {
    return 'Invalid transaction category.';
  }

  return null;
}
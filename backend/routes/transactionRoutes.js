const express = require('express');

const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

const validateTransaction = require('../middleware/transactionValidation');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  getTransactions
);

router.post(
  '/',
  authenticateToken,
  validateTransaction,
  addTransaction
);

router.put(
  '/:id',
  authenticateToken,
  validateTransaction,
  updateTransaction
);

router.delete(
  '/:id',
  authenticateToken,
  deleteTransaction
);

module.exports = router;
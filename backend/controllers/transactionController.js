const db = require('../db');

// =========================
// GET USER TRANSACTIONS
// =========================

function getTransactions(req, res) {
  const userId = req.user.userId;

  const sql = `
    SELECT
      id,
      DATE_FORMAT(date, '%Y-%m-%d') AS date,
      description,
      amount,
      type,
      category,
      created_at
    FROM transactions
    WHERE user_id = ?
    ORDER BY date DESC
  `;

  db.query(
    sql,
    [userId],
    (error, results) => {
      if (error) {
        console.error(
          'Failed to fetch transactions:',
          error.message
        );

        return res.status(500).json({
          message: 'Failed to fetch transactions',
        });
      }

      res.json(results);
    }
  );
}

// =========================
// ADD TRANSACTION
// =========================

function addTransaction(req, res) {
  const {
    date,
    description,
    amount,
    type,
    category,
  } = req.body;

  const userId = req.user.userId;

  const sql = `
    INSERT INTO transactions
      (
        date,
        description,
        amount,
        type,
        category,
        user_id
      )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    date,
    description,
    amount,
    type,
    category,
    userId,
  ];

  db.query(
    sql,
    values,
    (error, result) => {
      if (error) {
        console.error(
          'Failed to add transaction:',
          error.message
        );

        return res.status(500).json({
          message: 'Failed to add transaction',
        });
      }

      res.status(201).json({
        message: 'Transaction added successfully',
        id: result.insertId,
      });
    }
  );
}

// =========================
// UPDATE TRANSACTION
// =========================

function updateTransaction(req, res) {
  const {
    date,
    description,
    amount,
    type,
    category,
  } = req.body;

  const { id } = req.params;

  const userId = req.user.userId;

  const sql = `
    UPDATE transactions
    SET
      date = ?,
      description = ?,
      amount = ?,
      type = ?,
      category = ?
    WHERE
      id = ?
      AND user_id = ?
  `;

  const values = [
    date,
    description,
    amount,
    type,
    category,
    id,
    userId,
  ];

  db.query(
    sql,
    values,
    (error, result) => {
      if (error) {
        console.error(
          'Failed to update transaction:',
          error.message
        );

        return res.status(500).json({
          message: 'Failed to update transaction',
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Transaction not found',
        });
      }

      res.json({
        message:
          'Transaction updated successfully',
      });
    }
  );
}

// =========================
// DELETE TRANSACTION
// =========================

function deleteTransaction(req, res) {
  const { id } = req.params;

  const userId = req.user.userId;

  const sql = `
    DELETE FROM transactions
    WHERE
      id = ?
      AND user_id = ?
  `;

  db.query(
    sql,
    [id, userId],
    (error, result) => {
      if (error) {
        console.error(
          'Failed to delete transaction:',
          error.message
        );

        return res.status(500).json({
          message: 'Failed to delete transaction',
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Transaction not found',
        });
      }

      res.json({
        message:
          'Transaction deleted successfully',
      });
    }
  );
}

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
const express = require('express');
const cors = require('cors');

const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// TEST ROUTE
// =========================

app.get('/', (req, res) => {
  res.send('Finance Tracker API is running!');
});

// =========================
// TRANSACTION ROUTES
// =========================

app.use(
  '/api/transactions',
  transactionRoutes
);
app.use(
  '/api/users',
  userRoutes
);

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});
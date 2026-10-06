const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');

async function registerUser(req, res) {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users
        (name, email, password)
      VALUES (?, ?, ?)
    `;

    const values = [
      name,
      email,
      hashedPassword,
    ];

    db.query(
      sql,
      values,
      (error, result) => {
        if (error) {
          console.error(
            'Failed to register user:',
            error.message
          );

          return res.status(500).json({
            message: 'Failed to register user',
          });
        }

        res.status(201).json({
          message: 'User registered successfully',
          id: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error(
      'Failed to hash password:',
      error.message
    );

    res.status(500).json({
      message: 'Failed to register user',
    });
  }
}

async function loginUser(req, res) {
  const {
    email,
    password,
  } = req.body;

  try {
    const sql = `
      SELECT
        id,
        name,
        email,
        password
      FROM users
      WHERE email = ?
    `;

    db.query(
      sql,
      [email],
      async (error, results) => {
        if (error) {
          console.error(
            'Failed to find user:',
            error.message
          );

          return res.status(500).json({
            message: 'Failed to login',
          });
        }

        if (results.length === 0) {
          return res.status(401).json({
            message: 'Invalid email or password',
          });
        }

        const user = results[0];

        const passwordMatches =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!passwordMatches) {
          return res.status(401).json({
            message: 'Invalid email or password',
          });
        }

        // Make sure the JWT secret exists
        if (!process.env.JWT_SECRET) {
          console.error(
            'JWT_SECRET is not configured'
          );

          return res.status(500).json({
            message: 'Server authentication configuration error',
          });
        }

        // Create a JWT containing the user's ID
        const token = jwt.sign(
          {
            userId: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );

        res.json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.error(
      'Failed to login:',
      error.message
    );

    res.status(500).json({
      message: 'Failed to login',
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
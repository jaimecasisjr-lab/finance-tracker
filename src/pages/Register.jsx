import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {
      await register(
        name.trim(),
        email.trim(),
        password
      );

      navigate('/login');

    } catch (error) {
      setError(error.message);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* HEADER */}
        <div className="auth-header">

          <div className="auth-logo">
            $
          </div>

          <h1>
            Create Account
          </h1>

          <p>
            Start tracking your finances today.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {/* NAME */}
          <div className="auth-form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              className="auth-input"
              autoComplete="name"
              required
            />

          </div>

          {/* EMAIL */}
          <div className="auth-form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              className="auth-input"
              autoComplete="email"
              required
            />

          </div>

          {/* PASSWORD */}
          <div className="auth-form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              className="auth-input"
              autoComplete="new-password"
              required
            />

          </div>

          {/* ERROR */}
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating account...'
              : 'Create Account'}
          </button>

        </form>

        {/* LOGIN LINK */}
        <div className="auth-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Log in
          </Link>

        </div>

      </div>

    </div>
  );
}
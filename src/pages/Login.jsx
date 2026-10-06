import { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

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
      await login(
        email.trim(),
        password
      );

      navigate('/dashboard');

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
            Welcome!
          </h1>

          <p>
            Log in to manage your finances.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

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

            <div className="auth-label-row">
              <label htmlFor="password">
                Password
              </label>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              className="auth-input"
              autoComplete="current-password"
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
              ? 'Logging in...'
              : 'Login'}
          </button>

        </form>

        {/* REGISTER LINK */}
        <div className="auth-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create an account
          </Link>

        </div>

      </div>

    </div>
  );
}
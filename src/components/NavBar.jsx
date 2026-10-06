import { useState } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [profilePhoto, setProfilePhoto] =
    useState(() =>
      localStorage.getItem('profilePhoto')
    );

  const getInitials = (name) => {
    if (!name) {
      return '?';
    }

    const words = name.trim().split(' ');

    if (words.length === 1) {
      return words[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  return (
    <nav className="navbar">
      <Link
        to="/dashboard"
        className="navbar-brand"
      >
        Finance Tracker
      </Link>

      <div className="navbar-right">

        <div className="navbar-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Analytics
          </NavLink>
        </div>


        {user && (
          <div className="user-menu">

            <button
              type="button"
              className="user-menu-button"
              onClick={() =>
                setIsMenuOpen(
                  (current) => !current
                )
              }
              aria-expanded={isMenuOpen}
              aria-label="Open user menu"
            >

              <span className="user-avatar">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt=""
                    className="navbar-profile-photo"
                  />
                ) : (
                  getInitials(user.name)
                )}
              </span>

              <span className="user-name">
                {user.name}
              </span>

              <span
                className={
                  isMenuOpen
                    ? 'user-chevron open'
                    : 'user-chevron'
                }
              >
                ▼
              </span>

            </button>


            {isMenuOpen && (
              <div className="user-dropdown">

                <div className="user-dropdown-header">

                  <div className="user-dropdown-avatar">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt=""
                        className="navbar-dropdown-photo"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>

                  <div className="user-dropdown-info">

                    <strong>
                      {user.name}
                    </strong>

                    <span>
                      {user.email}
                    </span>

                  </div>

                </div>


                <div className="user-dropdown-divider" />


                <Link
                  to="/profile"
                  className="user-dropdown-item"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                >
                  <span>👤</span>
                  Profile
                </Link>


                <Link
                  to="/settings"
                  className="user-dropdown-item"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                >
                  <span>⚙</span>
                  Settings
                </Link>


                <div className="user-dropdown-divider" />


                <button
                  type="button"
                  className="user-dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  <span>↪</span>
                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}
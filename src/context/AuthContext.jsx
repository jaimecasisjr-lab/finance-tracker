import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem('token')
  );

  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem('user');

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  // =========================
  // LOGIN
  // =========================

  const login = async (
    email,
    password
  ) => {
    const response = await fetch(
      'http://localhost:5000/api/users/login',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || 'Login failed'
      );
    }

    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );

    setToken(data.token);
    setUser(data.user);
  };

  // =========================
  // REGISTER
  // =========================

  const register = async (
    name,
    email,
    password
  ) => {
    const response = await fetch(
      'http://localhost:5000/api/users/register',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          'Registration failed'
      );
    }

    return data;
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
  }, []);

  // =========================
  // HANDLE EXPIRED TOKEN
  // =========================

  const handleTokenExpiration =
    useCallback(() => {
      logout();
    }, [logout]);

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    token,
    user,

    login,
    register,
    logout,

    handleTokenExpiration,

    isAuthenticated: Boolean(token),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import NavBar from './components/NavBar';

import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AnalyticsPage from './pages/AnalyticsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import ProtectedRoute from './components/ProtectedRoute';

import {
  TransactionProvider,
} from './context/TransactionContext';

import {
  AuthProvider,
} from './context/AuthContext';

import './App.css';

function AppContent() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <NavBar />}

      <main>
        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =========================
              PROTECTED ROUTES
          ========================= */}

          <Route
            element={<ProtectedRoute />}
          >

            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/analytics"
              element={<AnalyticsPage />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>

        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <TransactionProvider>

          <AppContent />

        </TransactionProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
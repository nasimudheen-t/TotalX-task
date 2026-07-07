import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import Login from '../pages/Login/Login';
import OtpVerification from '../pages/OtpVerification/OtpVerification';
import Registration from '../pages/Registration/Registration';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';



// Guard for unauthenticated pages (Login, Verify)
const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

// Guard for authenticated pages (Home)
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Guard for Registration page
const RegistrationRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { phone, isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (isAuthenticated && user) {
    return <Navigate to="/home" replace />;
  }
  
  if (!phone) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Login Screen */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* OTP Screen */}
      <Route
        path="/verify"
        element={
          <PublicRoute>
            <OtpVerification />
          </PublicRoute>
        }
      />

      {/* Registration Screen */}
      <Route
        path="/register"
        element={
          <RegistrationRoute>
            <Registration />
          </RegistrationRoute>
        }
      />

      {/* Home Dashboard */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Fallback 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

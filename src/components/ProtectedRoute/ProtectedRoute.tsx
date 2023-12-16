import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactElement;
  isLoggedIn: boolean;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  element,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route {...rest} element={isLoggedIn ? element : <Navigate to="/" />} />
  );
};

export default ProtectedRoute;

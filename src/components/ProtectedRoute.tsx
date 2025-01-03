import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface CustomJwtPayload extends JwtPayload {
  role: string;
}
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const accessToken = localStorage.getItem("data");

  if (!accessToken) {
    return <Navigate to='/login' />;
  }

  const decoded = jwtDecode<CustomJwtPayload>(accessToken);
  if (decoded?.role !== "Admin") {
    return <Navigate to='/' />;
  } else {
    return children;
  }
};

export default ProtectedRoute;

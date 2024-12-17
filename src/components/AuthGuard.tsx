import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
  role?: string;
}

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Thêm trạng thái xác thực
  const [role, setRole] = useState<string | null>(null); // Lưu trữ vai trò người dùng

  useEffect(() => {
    const data = localStorage.getItem("data");

    if (!data) {
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const { access_token } = JSON.parse(data);
      const decoded: DecodedToken = jwtDecode(access_token);
      const userRole = decoded.role;

      // Kiểm tra vai trò
      if (userRole === "Admin") {
        setRole("Admin");
      } else if (userRole === "User") {
        setRole("User");
      } else {
        setRole(null);
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid token", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    // Có thể hiển thị một spinner hoặc loading state
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Nếu không xác thực, chuyển hướng về trang chủ
    return <Navigate to='/' />;
  }

  return <>{children}</>;
};

export default AuthGuard;

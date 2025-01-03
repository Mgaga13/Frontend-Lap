import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useStore } from "../store";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { UserSlice, AuthSlice } = useStore();
  const handleLogout = () => {
    UserSlice.setIsLoggedIn(false);
    AuthSlice.setAccessToken(null);
    AuthSlice.setRefreshToken(null);
    localStorage.removeItem("data");
    window.location.href = "/";
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col flex-grow'>
        {/* Header */}
        <header className='bg-gray-800 text-white h-16 flex items-center px-4 shadow-md'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <h1 className='text-lg font-bold'>Dashboard</h1>
          </div>

          {/* Dropdown */}
          <div className='ml-auto relative flex items-center gap-4'>
            {/* Avatar và tên người dùng */}
            <button className='flex items-center gap-2 focus:outline-none'>
              <FaUserCircle className='text-2xl' />
              <span className='hidden sm:inline'>Admin</span>
            </button>

            {/* Nút Đăng xuất */}
            <button
              className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md focus:outline-none transition'
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span className='hidden sm:inline'>Đăng xuất</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main
          className='flex-grow bg-gray-100 p-4 overflow-y-scroll overflow-x-hidden'
          style={{
            height: "300px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

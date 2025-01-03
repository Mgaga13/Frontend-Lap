import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaProductHunt,
  FaListAlt,
  FaChartBar,
  FaImage,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`bg-gray-900 text-white ${
        isOpen ? "w-64" : "w-16"
      } h-screen flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        <Link to={"/dashboard"}>
          <span
            className={`font-bold text-xl ${
              !isOpen && "hidden"
            } cursor-pointer`}
          >
            Admin
          </span>
        </Link>
        <button
          className='text-gray-400 hover:text-white focus:outline-none'
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <FaChevronLeft className='transition-transform duration-300' />
          ) : (
            <FaChevronRight className='transition-transform duration-300' />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className='flex-grow mt-4'>
        <ul>
          <li className='px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center'>
            <FaUser className='mr-3' />
            <Link to='/dashboard/users' className={`${!isOpen && "hidden"}`}>
              Người dùng
            </Link>
          </li>
          <li className='px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center'>
            <FaProductHunt className='mr-3' />
            <Link to='/dashboard/products' className={`${!isOpen && "hidden"}`}>
              Sản phẩm
            </Link>
          </li>
          <li className='px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center'>
            <FaListAlt className='mr-3' />
            <Link
              to='/dashboard/categories'
              className={`${!isOpen && "hidden"}`}
            >
              Thể loại
            </Link>
          </li>

          <li className='px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center'>
            <FaListAlt className='mr-3' />
            <Link to='/dashboard/order' className={`${!isOpen && "hidden"}`}>
              Đơn hàng
            </Link>
          </li>
          <li className='px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center'>
            <FaImage className='mr-3' />
            <Link to='/dashboard/banner' className={`${!isOpen && "hidden"}`}>
              Quảng cáo
            </Link>
          </li>
          <li className='px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center'>
            <FaImage className='mr-3' />
            <Link to='/dashboard/brand' className={`${!isOpen && "hidden"}`}>
              Nhãn hàng
            </Link>
          </li>
          <li className='px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center'>
            <FaChartBar className='mr-3' />
            <Link to='/dashboard/reports' className={`${!isOpen && "hidden"}`}>
              Thống kê
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className='p-4 text-center border-t border-gray-700'>
        {isOpen && (
          <span className='text-sm text-gray-400'>© 2024 Quản lý</span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

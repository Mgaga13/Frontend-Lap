import { useState } from "react";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useStore } from "../store";
import { useCountCart } from "../services/react-query/query/cart";
const Header = () => {
  const { UserSlice, AuthSlice } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { data: count } = useCountCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useNavigate();
  const navLinks = [{ title: "Home", href: "#" }];

  const handleLogout = () => {
    UserSlice.setIsLoggedIn(false);
    AuthSlice.setAccessToken(null);
    AuthSlice.setRefreshToken(null);
    localStorage.removeItem("data");
    window.location.href = "/";
  };

  return (
    <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <img
              className='h-8 w-auto'
              src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9'
              alt='Company Logo'
            />
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* User Login and Cart Icons */}
          <div className='flex items-center space-x-4'>
            {/* Kiểm tra nếu đã đăng nhập */}
            {UserSlice.isLoggedIn ? (
              <div className='relative'>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='flex items-center text-gray-600 hover:text-gray-900 focus:outline-none'
                >
                  <FiUser className='h-6 w-6 mr-2' />
                </button>
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1'>
                    <Link
                      to='/user/profile'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to='/user/change-password'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Đổi mật khẩu
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Nếu chưa đăng nhập, hiển thị biểu tượng đăng nhập
              <Link
                to='/sign-in'
                className='flex items-center text-gray-600 hover:text-gray-900'
                aria-label='User account'
              >
                <FiUser className='h-6 w-6' />
              </Link>
            )}

            <button
              className='relative p-2 text-gray-600 hover:text-gray-900'
              aria-label='Shopping cart'
              onClick={() => {
                router("/cart");
              }}
            >
              <FiShoppingCart className='h-6 w-6' />
              {/* {count > 0 && ( */}
              <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                {3}
              </span>
              {/* )} */}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none'
              aria-label='Main menu'
            >
              {isMenuOpen ? (
                <IoMdClose className='h-6 w-6' />
              ) : (
                <FiMenu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

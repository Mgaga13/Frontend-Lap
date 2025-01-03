import { useContext, useEffect, useState } from "react";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useStore } from "../store";
import { useCountCart } from "../services/react-query/query/cart"; // Hook lấy số lượng giỏ hàng
import { SearchContext } from "./Layout";

const Header = () => {
  const { setSearch, totalCart, setTotalCart } = useContext(SearchContext);
  const { UserSlice, AuthSlice } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Số lượng sản phẩm trong giỏ hàng
  const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm
  const router = useNavigate();
  const { data: count, isLoading, refetch, isSuccess } = useCountCart(); // API lấy số lượng giỏ hàng

  useEffect(() => {
    setTotalCart(count);
  }, [count]);
  useEffect(() => {
    refetch();
  }, [isSuccess]);
  const handleLogout = () => {
    UserSlice.setIsLoggedIn(false);
    AuthSlice.setAccessToken(null);
    AuthSlice.setRefreshToken(null);
    localStorage.removeItem("data");
    window.location.href = "/";
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSearch(searchQuery);
    }
  };

  return (
    <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 content'>
          {/* Logo */}
          <a href='/' className='flex-shrink-0 cursor-pointer'>
            <img
              className='h-8 w-auto'
              src='/image/logo.jpg'
              alt='Company Logo'
            />
          </a>

          {/* Search Box */}
          <div className='hidden md:flex items-center'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Nhấn Enter để tìm kiếm
              placeholder='Tìm kiếm sản phẩm...'
              className='border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={handleSearch}
              className='ml-2 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
            >
              Tìm kiếm
            </button>
          </div>

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
                      to='/user/order'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Đơn hàng của bạn
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
              <Link
                to='/login'
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
                if (!UserSlice.isLoggedIn) {
                  router("/login");
                } else {
                  router("/cart");
                }
              }}
            >
              <FiShoppingCart className='h-6 w-6' />
              {totalCart > 0 && (
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                  {totalCart ?? "0"}
                </span>
              )}
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
    </header>
  );
};

export default Header;

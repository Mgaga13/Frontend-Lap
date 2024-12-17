import React, { useState } from "react";
import { FiMenu, FiShoppingCart, FiSearch, FiUser } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navLinks = [
    { title: "Home", href: "#" },
    { title: "Shop", href: "#" },
    { title: "About Us", href: "#" },
    { title: "Contact", href: "#" },
  ];

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

          {/* Search Bar */}
          <div className='hidden md:flex flex-1 max-w-md mx-4'>
            <div className='relative w-full'>
              <input
                type='text'
                className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500'
                placeholder='Search products...'
                aria-label='Search products'
              />
              <button
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                aria-label='Search'
              >
                <FiSearch className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* User Login and Cart Icons */}
          <div className='flex items-center space-x-4'>
            <Link
              to='/sign-in'
              className='flex items-center text-gray-600 hover:text-gray-900'
              aria-label='User account'
            >
              <FiUser className='h-6 w-6' />
            </Link>
            <button
              className='relative p-2 text-gray-600 hover:text-gray-900'
              aria-label='Shopping cart'
            >
              <FiShoppingCart className='h-6 w-6' />
              {cartItems > 0 && (
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                  {cartItems}
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
          <div className='px-4 py-3'>
            <div className='relative'>
              <input
                type='text'
                className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500'
                placeholder='Search products...'
                aria-label='Search products'
              />
              <button
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                aria-label='Search'
              >
                <FiSearch className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

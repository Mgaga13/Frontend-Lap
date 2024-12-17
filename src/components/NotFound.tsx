import { FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
      <div className='max-w-4xl w-full text-center'>
        <div className='mb-8'>
          <img
            src='https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80'
            alt='404 Illustration'
            className='w-64 h-64 mx-auto object-cover rounded-lg shadow-lg'
          />
        </div>

        <h1 className='text-6xl font-bold text-gray-900 mb-4'>
          <span className='text-indigo-600'>404</span> - Page Not Found
        </h1>

        <p className='text-xl text-gray-600 mb-8'>
          Oops! The page you are looking for does not exist.
        </p>

        <div className='space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center'>
          <Link
            to='/'
            className='inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
          >
            <FaHome className='mr-2' />
            Back to Home
          </Link>

          <button
            className='inline-flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
            onClick={() => (window.location.href = "/search")}
          >
            <FaSearch className='mr-2' />
            Search Site
          </button>
        </div>

        <div className='mt-12 text-gray-500'>
          <p>
            Lost? Try checking our help center or contact support for
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

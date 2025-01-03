import { FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
      <div className='max-w-4xl w-full text-center'>
        <div className='mb-8'>
          <img
            src='https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80'
            alt='404 Minh họa'
            className='w-64 h-64 mx-auto object-cover rounded-lg shadow-lg'
          />
        </div>

        <h1 className='text-6xl font-bold text-gray-900 mb-4'>
          <span className='text-indigo-600'>404</span> - Trang Không Tồn Tại
        </h1>

        <p className='text-xl text-gray-600 mb-8'>
          Oops! Trang bạn đang tìm kiếm không tồn tại.
        </p>

        <div className='space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center'>
          <Link
            to='/'
            className='inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
          >
            <FaHome className='mr-2' />
            Quay về Trang Chủ
          </Link>
        </div>

        <div className='mt-12 text-gray-500'>
          <p>
            Lạc đường? Hãy thử kiểm tra trung tâm trợ giúp hoặc liên hệ với bộ
            phận hỗ trợ để được trợ giúp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import { useState } from "react";
import FilterBar from "./FilterBar";
import ExampleProductGrid from "./test";
import { useGetListProduct } from "../services/react-query/query/product";

const ListProduct = () => {
  const [page, setPage] = useState(1);
  const {
    data: ListProduct,
    isLoading,
    refetch,
    isFetching,
  } = useGetListProduct({
    page_index: page,
  });
  // console.log(ListProduct, isLoading, refetch, isFetching);
  return (
    <section className='py-24 content'>
      <aside className='lg:col-span-1'>
        <FilterBar />
      </aside>
      <div className='mx-auto max-w-7xl'>
        <h2 className='font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center'>
          Products
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <a
            href='#!'
            className='max-w-[384px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
          >
            {/* Product Image */}
            <div className='w-full max-w-sm aspect-square overflow-hidden'>
              <img
                src='https://pagedone.io/asset/uploads/1701157806.png'
                alt='cream image'
                className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
              />
            </div>

            {/* Product Details */}
            <div className='mt-5 px-4 pb-4 flex flex-col gap-2'>
              <h6 className='font-medium text-lg text-gray-900 truncate'>
                Skin Care Cream
              </h6>
              <h6 className='font-semibold text-xl text-indigo-600'>$74.99</h6>
              <div className='mt-4 flex items-center justify-between'>
                <span className='text-sm text-gray-500'>Free Shipping</span>
                <button className='p-3 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg'>
                  <svg
                    className='w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 26 26'
                    fill='none'
                  >
                    <path
                      d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                      stroke='currentColor'
                      strokeWidth='1.6'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </a>

          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square'>
              <img
                src='https://pagedone.io/asset/uploads/1701157826.png'
                alt='cream image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Men’s Facial
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $25
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>

          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
          <a href='#!' className='max-w-[384px] mx-auto'>
            <div className='w-full max-w-sm aspect-square relative'>
              <img
                src='https://pagedone.io/asset/uploads/1701157844.png'
                alt='serum bottle image'
                className='w-full h-full rounded-xl object-cover'
              />
            </div>
            <div className='mt-5 flex items-center justify-between'>
              <div className=''>
                <h6 className='font-medium text-xl leading-8 text-black mb-2'>
                  Dark circles serum
                </h6>
                <h6 className='font-semibold text-xl leading-8 text-indigo-600'>
                  $199.99
                </h6>
              </div>
              <button className='p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50'>
                <svg
                  className='stroke-gray-900 transition-all duration-500 group-hover:stroke-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='26'
                  height='26'
                  viewBox='0 0 26 26'
                  fill='none'
                >
                  <path
                    d='M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25'
                    stroke=''
                    stroke-width='1.6'
                    stroke-linecap='round'
                  />
                </svg>
              </button>
            </div>
          </a>
        </div>
      </div>
      <ExampleProductGrid></ExampleProductGrid>
    </section>
  );
};
export default ListProduct;

import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div id='content' role='main' className='w-full  max-w-md mx-auto p-6'>
      <div className='mt-7 bg-white  rounded-xl shadow-lg  dark:border-gray-700 border-2 border-indigo-300'>
        <div className='p-4 sm:p-7'>
          <div className='text-center'>
            <h1 className='block text-2xl font-bold text-blue-500'>
              Forgot password?
            </h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              Remember your password?
              <Link
                className='text-blue-600 decoration-2 hover:underline font-medium'
                to='sign-in'
              >
                Login here
              </Link>
            </p>
          </div>

          <div className='mt-5'>
            <form>
              <div className='grid gap-y-4'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-bold ml-1 mb-2 dark:text-white'
                  >
                    Email address
                  </label>
                  <div className='relative'>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm'
                      required
                      aria-describedby='email-error'
                    />
                  </div>
                  <p
                    className='hidden text-xs text-red-600 mt-2'
                    id='email-error'
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
                >
                  Đặt lại mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;

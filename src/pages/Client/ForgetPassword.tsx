import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForgetPassword } from "../../services/react-query/query/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { mutate: forgetPasswrod } = useForgetPassword();
  const validateEmail = (email: any) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });
    forgetPasswrod(
      {
        email,
      },
      {
        onError: () => {
          setMessage({
            type: "error",
            text: "An error occurred. Please try again later.",
          });
          setLoading(false);
        },
        onSuccess: () => {
          setMessage({
            type: "success",
            text: "If an account with that email exists, a reset link has been sent.",
          });
          setEmail("");
          setLoading(false);
        },
      }
    );
    // Simulate API call
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   setMessage({
    //     type: "success",
    //     text: "If an account with that email exists, a reset link has been sent.",
    //   });
    //   setEmail("");
    // } catch (error) {
    //   setMessage({
    //     type: "error",
    //     text: "An error occurred. Please try again later.",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <RiLockPasswordLine className='w-20 h-20 text-indigo-600' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Forgot your password?
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiMail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {message.text && (
              <div
                className={`rounded-md p-4 ${
                  message.type === "success" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    message.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            )}

            <div>
              <button
                type='submit'
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Sending Reset Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

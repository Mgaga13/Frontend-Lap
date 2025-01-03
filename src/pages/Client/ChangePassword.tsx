import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useChangePassword,
  useResetPassword,
} from "../../services/react-query/query/user";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const location = useLocation();
  const router = useNavigate();
  const isResetPassword = location.pathname.includes("reset-password");
  const token = new URLSearchParams(location.search).get("token");
  const { mutate: resetPassword } = useResetPassword();
  const { mutate: changePassword } = useChangePassword();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const validatePassword = (password: any) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name: any, value: any) => {
    let newErrors = { ...errors };

    switch (name) {
      case "currentPassword":
        newErrors.currentPassword = !value
          ? "Current password is required"
          : "";
        break;
      case "newPassword":
        newErrors.newPassword = !validatePassword(value)
          ? "Password must be at least 8 characters long and contain at least one letter, one number, and one special character"
          : "";
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          newErrors.confirmPassword = "";
        }
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value !== formData.newPassword ? "Passwords do not match" : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isResetPassword) {
      resetPassword(
        {
          newPassword: formData.newPassword,
          resetToken: token,
        },
        {
          onSuccess: () => {
            toast.done("Reset Password Success");
            router("/login");
          },
        }
      );
    } else {
      changePassword(
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          onSuccess: () => {
            toast.done("Change Password Success");
            router("/login");
          },
        }
      );
    }
    // Add your password change logic here
    console.log("Password change submitted", formData);
  };

  const isFormValid = () => {
    if (isResetPassword) {
      return (
        // formData.currentPassword &&
        formData.newPassword &&
        // formData.confirmPassword &&
        !errors.currentPassword &&
        !errors.newPassword &&
        !errors.confirmPassword
      );
    } else {
      return (
        formData.currentPassword &&
        formData.newPassword &&
        formData.confirmPassword &&
        !errors.currentPassword &&
        !errors.newPassword &&
        !errors.confirmPassword
      );
    }
  };

  const togglePasswordVisibility = (field: any) => {
    setShowPasswords((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <div className='text-center'>
          <div className='mx-auto h-12 w-12 text-center'>
            <FaLock className='h-12 w-12 text-indigo-600 mx-auto' />
          </div>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
            {isResetPassword ? "Đặt lại mật khẩu" : "Đổi mật khẩu "}
          </h2>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            {!isResetPassword && (
              <div>
                <label
                  htmlFor='currentPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Mật khẩu hiện tại
                </label>
                <div className='mt-1 relative'>
                  <input
                    id='currentPassword'
                    name='currentPassword'
                    type={showPasswords.current ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={() => togglePasswordVisibility("current")}
                  >
                    {showPasswords.current ? (
                      <FaEyeSlash className='h-5 w-5 text-gray-400' />
                    ) : (
                      <FaEye className='h-5 w-5 text-gray-400' />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.currentPassword}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor='newPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Mật khẩu mới
              </label>
              <div className='mt-1 relative'>
                <input
                  id='newPassword'
                  name='newPassword'
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? (
                    <FaEyeSlash className='h-5 w-5 text-gray-400' />
                  ) : (
                    <FaEye className='h-5 w-5 text-gray-400' />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Xác nhận mật khẩu
              </label>
              <div className='mt-1 relative'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? (
                    <FaEyeSlash className='h-5 w-5 text-gray-400' />
                  ) : (
                    <FaEye className='h-5 w-5 text-gray-400' />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={!isFormValid()}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isFormValid()
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../../services/react-query/query/user";
import { Link, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useStore } from "../../store";

const LoginForm = () => {
  const { UserSlice } = useStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isError, mutate: login } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };
  useEffect(() => {
    if (UserSlice.isLoggedIn) {
      const accessToken = localStorage.getItem("data") ?? "";
      const decode = jwtDecode<any>(accessToken);
      if (decode?.role !== "Admin") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }
  }, [UserSlice.isLoggedIn]);
  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.email.trim()) newErrors.email = "Yêu cầu email";
    if (!formData.password.trim()) newErrors.password = "Yêu cầu mật khẩu";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData, {
        // onSuccess: () => {

        // },
        onError: () => setErrors({ global: "Email hoặc mật khẩu không đúng" }),
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-extrabold text-center mb-6'>Đăng nhập</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.email && (
              <p className='text-red-600 text-sm'>{errors.email}</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Mật khẩu
            </label>
            <div className='relative'>
              <input
                name='password'
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-[0.8rem] text-gray-500'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-600 text-sm'>{errors.password}</p>
            )}
          </div>
          <div className='text-right mt-2'>
            <Link to='/reset-password' className='text-indigo-600'>
              Quên mật khẩu?
            </Link>
          </div>
          {isError && (
            <p className='text-red-600 text-sm'>
              Email hoặc mật khẩu không đúng
            </p>
          )}
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 rounded-lg'
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          <div className='text-center mt-4'>
            <Link to='/register' className='text-indigo-600'>
              Bạn chưa có tài khoản? Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin, useSignup } from "../../services/react-query/query/user";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { jwtDecode } from "jwt-decode";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isError: errorLogin, mutate: login } = useLogin();
  const { UserSlice } = useStore();
  const {
    mutate: register,
    isSuccess: registerSuc,
    isError: errorSign,
  } = useSignup();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset individual field errors
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Reset global errors when interacting with email field
    if (name === "email") {
      setErrors((prev: any) => ({
        ...prev,
        global: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.email.trim()) {
      newErrors.email = "Yêu cầu email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Yêu cầu tên";
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Yêu cầu xác thực mật khẩu";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu không trùng";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      if (isLogin) {
        login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        register({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        });
      }

      // Add your authentication logic here
    }
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (registerSuc) {
      setIsLogin(!isLogin);
    }
  }, [registerSuc]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {isLogin ? "Đăng nhập tài khoản" : "Tạo tài khoản"}
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm space-y-4'>
            {!isLogin && (
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Full Name
                </label>
                <div className='mt-1'>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    autoComplete='name'
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder='Nhập tên ở đây'
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className='mt-2 text-sm text-red-600' role='alert'>
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder='Nhập email ở đây'
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Mật khẩu
              </label>
              <div className='mt-1 relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  autoComplete='current-password'
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder='Nhập mật khẩu'
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className='h-5 w-5 text-gray-400' />
                  ) : (
                    <FaEye className='h-5 w-5 text-gray-400' />
                  )}
                </button>
                {errors.password && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Xác nhận mật khẩu
                </label>
                <div className='mt-1'>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder='Xác nhận mật khẩu'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className='mt-2 text-sm text-red-600' role='alert'>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          {errorLogin ? (
            <div className='text-red-500'>Email hoặc mật khẩu không đúng</div>
          ) : (
            ""
          )}
          {errorSign ? (
            <div className='text-red-500'>Vui lòng tạo tài khoản khác</div>
          ) : (
            ""
          )}
          {isLogin && (
            <div className='flex items-center justify-between'>
              <div className='text-sm'>
                <Link
                  to={"/reset-password"}
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
          )}

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
            >
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          </div>

          <div className='text-center'>
            <button
              type='button'
              className='text-sm text-indigo-600 hover:text-indigo-500'
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Bạn cần tạo tài khoản? Đăng ký"
                : "Bạn đã có tài khoản ? Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

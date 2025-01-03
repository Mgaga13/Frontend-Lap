import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignup } from "../../services/react-query/query/user";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isError, mutate: register } = useSignup();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Yêu cầu tên";
    if (!formData.email.trim()) newErrors.email = "Yêu cầu email";
    if (!formData.password.trim()) newErrors.password = "Yêu cầu mật khẩu";
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Yêu cầu xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không trùng khớp";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      register(formData, {
        onSuccess: () => navigate("/login"),
        onError: () => setErrors({ global: "Vui lòng tạo tài khoản khác" }),
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-extrabold text-center mb-6'>Đăng ký</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Họ và tên
            </label>
            <input
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.name && (
              <p className='text-red-600 text-sm'>{errors.name}</p>
            )}
          </div>
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
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Xác nhận mật khẩu
            </label>
            <input
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.confirmPassword && (
              <p className='text-red-600 text-sm'>{errors.confirmPassword}</p>
            )}
          </div>
          {isError && (
            <p className='text-red-600 text-sm'>Vui long tạo tài khoản khác</p>
          )}
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 rounded-lg'
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>
          <div className='text-center mt-4'>
            <button
              type='button'
              onClick={() => navigate("/login")}
              className='text-indigo-600 hover:text-indigo-500'
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

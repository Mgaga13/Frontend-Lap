import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useProfileUser,
  useUpdateProfileUser,
} from "../services/react-query/query/user";

interface FormData {
  name: string;
  avatar: File | null; // Either a File object or null
  gender: string;
  dob: string;
  address: string;
  phone: string;
}

export const UserProfile = () => {
  const { data: listData, isLoading, refetch } = useProfileUser();
  const { mutate: editUser, isSuccess: isSuccessEdit } = useUpdateProfileUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    avatar: null,
    gender: "",
    dob: "",
    address: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (listData) {
      setFormData({
        name: listData.name || "",
        phone: listData.phone || "",
        avatar: null,
        address: listData.address || "",
        gender: listData.gender || "Male",
        dob: listData.dob || "",
      });
      setAvatarPreview(listData.avatar);
    }
  }, [listData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) {
        setFormData((prev) => ({ ...prev, avatar: file }));

        const reader = new FileReader();
        reader.onload = () => {
          setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("File is too large. Maximum size is 2MB.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("address", formData.address);
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }
    setIsSubmitting(true);

    editUser(formDataToSend, {
      onSuccess: () => {
        toast.success("Hồ sơ cập nhật thành công!");
        refetch(); // Optionally refetch profile data
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Thất bại khi cập nhật hồ sơ"
        );
        setIsSubmitting(false);
      },
    });
  };

  if (isLoading) {
    return <div className='text-center py-6'>Loading...</div>;
  }
  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='flex flex-col md:flex-row'>
          {/* Phần ảnh đại diện */}
          <div className='flex justify-center items-center md:w-1/3 p-6 bg-gray-100'>
            <div className='relative w-40 h-40'>
              <img
                src={
                  avatarPreview ? avatarPreview : "/image/avatar-default.png"
                }
                alt='User avatar'
                className='w-full h-full rounded-full object-cover'
              />
              <label
                htmlFor='avatar-upload'
                className='absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors'
              >
                <FaUser className='text-white' />
              </label>
              <input
                id='avatar-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Phần thông tin người dùng */}
          <div className='md:w-2/3 p-8'>
            <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1'>
              Thông tin cá nhân
            </div>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Tên
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaUser className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='focus:ring-indigo-500 pt-2 pb-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                    placeholder='Tên của bạn'
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Giới tính
                </label>
                <select
                  name='gender'
                  value={formData.gender}
                  onChange={handleInputChange}
                  className='focus:ring-indigo-500 pt-2 pb-2 focus:border-indigo-500 block w-full pl-3 pr-10 sm:text-sm border-gray-300 rounded-md'
                >
                  <option value='Male'>Nam</option>
                  <option value='Female'>Nữ</option>
                  <option value='Other'>Khác</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Ngày sinh
                </label>
                <input
                  type='date'
                  name='dob'
                  value={formData.dob}
                  onChange={handleInputChange}
                  className='focus:ring-indigo-500 pt-2 pb-2 focus:border-indigo-500 block w-full pl-3 sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Số điện thoại
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaPhone className='text-gray-400' />
                  </div>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='focus:ring-indigo-500 pt-2 pb-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                    placeholder='Số điện thoại của bạn'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Địa chỉ
                </label>
                <input
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  className='focus:ring-indigo-500 pt-2 pb-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                  placeholder='Địa chỉ của bạn'
                />
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Chỉnh sửa..." : "Chỉnh sửa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

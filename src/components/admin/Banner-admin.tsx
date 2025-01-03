import React, { useState } from "react";
import { FaEdit, FaTrash, FaImage, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreateBanner,
  useEditBanner,
  useGetListBanner,
  useRemoveBanner,
} from "../../services/react-query/query/banner";

interface FormData {
  title: string;
  image: File | null; // Either a File object or null
  content: string;
}
const BannerAdmin = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: banners,
    isLoading,
    error,
    refetch,
  } = useGetListBanner({
    page,
    limit,
    searchText: searchQuery,
  });
  const { mutate: createBanner } = useCreateBanner();
  const { mutate: editBanner } = useEditBanner();

  const { mutate: removeBanner } = useRemoveBanner();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: null,
    content: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "avatar" && files) {
      const file = files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        setFormData({ ...formData, image: file });
        setPreviewImage(URL.createObjectURL(file)); // Cập nhật URL xem trước
      } else {
        toast.error("File is too large. Maximum size is 2MB.");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEdit = (banner: any) => {
    setIsEditing(true);
    setSelectedBanner(banner);
    setFormData(banner);
  };
  const handleDelete = (id: any) => {
    removeBanner(id, {
      onSuccess: () => {
        toast.success("Banner deleted successfully!");
        refetch();
      },
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSubmit.append(key, value as string | Blob);
    });
    if (isEditing) {
      editBanner(formDataToSubmit, {
        onSuccess: () => {
          setIsEditing(!isEditing);
          toast.success("Banner update successfully!");
          refetch();
        },
      });
    } else {
      createBanner(formDataToSubmit, {
        onSuccess: () => {
          setIsEditing(!isEditing);
          toast.success("Banner create successfully!");
          refetch();
        },
      });
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <ToastContainer position='top-right' autoClose={3000} />

      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Quảng cáo</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center'
          >
            <FaImage className='mr-2' /> Thêm mới quảng cáo
          </button>
        )}
      </div>

      {isEditing ? (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold'>
              {selectedBanner ? "Sửa quảng cáo" : "Thêm quảng cáo"}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className='text-gray-500 hover:text-gray-700'
            >
              <FaTimes size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-gray-700 mb-2'>Ảnh</label>
              <input
                type='file'
                name='avatar'
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt='Preview'
                  className='mt-4 w-32 h-32 object-cover rounded-lg'
                />
              )}
            </div>
            <div className='flex justify-end space-x-4'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='px-6 py-2 border rounded-lg hover:bg-gray-100'
              >
                Hủy
              </button>
              <button
                type='submit'
                className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
              >
                {selectedBanner ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </form>
        </div>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching banners.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {banners?.datas?.map((banner: any) => (
            <div
              key={banner.id}
              className='bg-white rounded-lg shadow-lg overflow-hidden'
            >
              <img
                src={banner.image}
                alt={banner.title}
                className='w-full h-48 object-cover'
                // onError={handleImageError}
              />
              <div className='p-4'>
                <div className='flex justify-between items-start mb-2'>
                  <h3 className='text-xl font-semibold'>{banner.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      banner.isDeleted
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    hoạt động
                  </span>
                </div>
                <p className='text-gray-600 mb-4'>{banner.content}</p>
                <div className='flex justify-end space-x-2'>
                  <button
                    onClick={() => handleEdit(banner)}
                    className='p-2 text-blue-500 hover:text-blue-600'
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className='p-2 text-red-500 hover:text-red-600'
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerAdmin;

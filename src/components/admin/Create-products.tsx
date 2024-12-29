import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUpload } from "react-icons/fi";
import { useCreateProduct } from "../../services/react-query/query/product";
import { useNavigate } from "react-router-dom";
import { useGetListCategory } from "../../services/react-query/query/category";
import { useGetListBrand } from "../../services/react-query/query/brand";

const CreateProducts = () => {
  const route = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    oldPrice: 0,
    description: "",
    quantity: 0,
    specification: "",
    brand_id: "",
    category_id: "",
  });
  const { data: categories } = useGetListCategory({
    page: 1,
    limit: 10,
    searchText: "",
  });
  const { data: brands } = useGetListBrand({
    page: 1,
    limit: 10,
    searchText: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});
  const { mutate: createProduct, isSuccess: isSuccessCreate } =
    useCreateProduct();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files); // Chuyển FileList thành mảng
    if (files.length > 0) {
      setImages((prevImages: any) => [...prevImages, ...files]); // Nối file mới vào mảng cũ
      const newPreviewUrls = files.map((file: any) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]); // Thêm preview URL mới
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Valid quantity is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (images.length === 0) {
      newErrors.images = "At least one product image is required";
    }
    return newErrors;
  };

  useEffect(() => {
    if (isSuccessCreate) {
      route("/dashboard/products");
    }
  }, [isSuccessCreate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();

    // Kiểm tra lỗi
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields!");
      return;
    }

    // Tạo FormData
    const formDataToSubmit = new FormData();
    images.forEach((image) => {
      formDataToSubmit.append("files", image); // Field name là "files"
    });
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSubmit.append(key, value as string | Blob);
    });
    // Gọi API gửi form
    createProduct(formDataToSubmit, {
      onSuccess: () => {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          price: 0,
          oldPrice: 0,
          description: "",
          quantity: 0,
          specification: "",
          brand_id: "",
          category_id: "",
        });
        setImages([]);
        setPreviewUrls([]);
      },
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>
          Tạo sản phẩm mới
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Product Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Tên sản phẩm*
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Enter product name'
              className={`mt-1 block w-full rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-500'>{errors.name}</p>
            )}
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label
                  htmlFor='brand'
                  className='block text-sm font-medium text-gray-700'
                >
                  Chọn nhãn hàng
                </label>
                <select
                  name='brand_id'
                  value={formData.brand_id}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white hover:border-gray-400 transition-colors duration-200'
                >
                  <option value=''>Chọn một nhãn hàng</option>
                  {brands?.datas?.map((brand: any) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700'
                >
                  Chọn thể loại
                </label>
                <select
                  name='category_id'
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white hover:border-gray-400 transition-colors duration-200'
                >
                  <option value=''>Chọn một thể loại</option>
                  {categories?.datas?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Giá*
              </label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                step='0.01'
                min='0'
                placeholder='0.00'
                className={`mt-1 block w-full rounded-md border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              />
              {errors.price && (
                <p className='mt-1 text-sm text-red-500'>{errors.price}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Giá cũ
              </label>
              <input
                type='number'
                name='oldPrice'
                value={formData.oldPrice}
                onChange={handleInputChange}
                step='0.01'
                min='0'
                placeholder='0.00'
                className='mt-1 block w-full rounded-md  border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              />
            </div>
          </div>
          {/* Image Upload */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Ảnh sản phẩm*
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                errors.images ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className='space-y-2 text-center'>
                <div className='flex flex-col items-center'>
                  <FiUpload className='h-12 w-12 text-gray-400' />
                  <p className='text-sm text-gray-600'>
                    Click to upload or drag and drop
                  </p>
                  <p className='text-xs text-gray-500'>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                  id='file-upload'
                  multiple
                />
                <label
                  htmlFor='file-upload'
                  className='cursor-pointer py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  Select Images
                </label>
              </div>
            </div>
            {previewUrls.length > 0 && (
              <div className='mt-4 flex items-center flex-wrap gap-x-8 gap-y-2'>
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index}`}
                    className='h-32 w-32 object-cover rounded-md'
                  />
                ))}
              </div>
            )}
            {errors.images && (
              <p className='mt-1 text-sm text-red-500'>{errors.images}</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description*
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              maxLength={5000}
              rows={4}
              placeholder='Enter product description'
              className={`mt-1 block w-full rounded-md border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
            <p className='mt-1 text-sm text-gray-500'>
              {formData.description.length}/5000 characters
            </p>
            {errors.description && (
              <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              specification*
            </label>
            <textarea
              name='specification'
              value={formData.specification}
              onChange={handleInputChange}
              maxLength={5000}
              rows={4}
              placeholder='Enter product specification'
              className={`mt-1 block w-full rounded-md border ${
                errors.specification ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
            <p className='mt-1 text-sm text-gray-500'>
              {formData.specification.length}/5000 characters
            </p>
            {errors.specification && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.specification}
              </p>
            )}
            <p className='mt-2 text-xs text-gray-500'>
              <pre className='bg-gray-100 p-4 rounded-md'>
                <code className='text-xs text-gray-800'>
                  {`{
  "Tương thích": "Windows",
  "Cách kết nối": "Wired-Detachable Type-C",
  "Độ dài dây / Khoảng cách kết nối": "2.01 m",
  "Loại switch": "Razer Linear Optical",
  "Kiểu bàn phím": "Tenkeyless (Rút gọn)",
  "Số phím": "87 phím",
  "Chất liệu keycaps": "PBT",
  "Đèn LED": "RGB",
  "Phần mềm hỗ trợ": "Razer Synapse",
  "Kích thước": "Dài 36.5 cm - Rộng 13.5 cm - Cao 1.9 cm - Nặng 1 kg",
  "Sản xuất tại": "Trung Quốc"
}`}
                </code>
              </pre>
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Quantity*
            </label>
            <input
              type='number'
              name='quantity'
              value={formData.quantity}
              onChange={handleInputChange}
              min='1'
              step='1'
              placeholder='Enter quantity'
              className={`mt-1 block w-full rounded-md border ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
            {errors.quantity && (
              <p className='mt-1 text-sm text-red-500'>{errors.quantity}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  );
};

export default CreateProducts;

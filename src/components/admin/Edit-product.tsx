import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUpload } from "react-icons/fi";
import {
  useEditProduct,
  useGetProduct,
} from "../../services/react-query/query/product";
import { useGetListCategory } from "../../services/react-query/query/category";
import { useGetListBrand } from "../../services/react-query/query/brand";

const EditProduct = () => {
  const route = useNavigate();
  const { id } = useParams(); // Lấy id từ URL param
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    oldprice: 0,
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
  const [oldSpecification, setSpecification] = useState("");

  // Fetch product details using the ID from the URL
  const { data: productData, isLoading } = useGetProduct(id);
  const { mutate: updateProduct, isSuccess: isSuccessUpdate } =
    useEditProduct();

  // Chỉnh sửa formData khi lấy dữ liệu sản phẩm
  useEffect(() => {
    if (productData) {
      setFormData({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        oldprice: productData.oldprice,
        description: productData.description,
        quantity: productData.quantity,
        specification: productData.specification,
        brand_id: productData.brand_id,
        category_id: productData.category_id,
      });
      setSpecification(productData.specification);
      // Thiết lập lại preview URL cho ảnh hiện tại của sản phẩm
      setPreviewUrls(productData.image.map((img: string) => img)); // Giả sử `productData.images` là mảng chứa URLs ảnh
    }
  }, [productData]);

  // Cập nhật thông tin input khi có sự thay đổi
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

  // Xử lý thay đổi ảnh
  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prevImages: any) => [...prevImages, ...files]);
      const newPreviewUrls = files.map((file: any) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  // Kiểm tra tính hợp lệ của form
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
    return newErrors;
  };

  // Xử lý gửi form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields!");
      return;
    }

    const formDataToSubmit = new FormData();

    images.forEach((image) => {
      formDataToSubmit.append("files", image);
    });
    // Append dữ liệu khác vào formData
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value as string | Blob);
    });

    updateProduct(formDataToSubmit, {
      onSuccess: () => {
        toast.success("Product updated successfully!");
        route("/dashboard/products");
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>Sửa sản phẩm</h2>
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
                  <option value=''>Chọn 1 nhãn hàng</option>
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
                name='oldprice'
                value={formData.oldprice}
                onChange={handleInputChange}
                step='0.01'
                min='0'
                placeholder='0.00'
                className='mt-1 block w-full rounded-md  border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              />
            </div>
          </div>
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
                  Chọn ảnh
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
              Mô tả*
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
            {errors.description && (
              <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Thông số kỹ thuật*
            </label>
            <textarea
              name='specification'
              value={formData.specification}
              onChange={handleInputChange}
              rows={4}
              placeholder='Enter product specification'
              className={`mt-1 block w-full rounded-md border ${
                errors.specification ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
            {errors.specification && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.specification}
              </p>
            )}
            <p>Thông số kỹ thuật cũ</p>
            <p className='mt-2 text-xs text-gray-500'>
              <pre className='bg-gray-100 p-4 rounded-md'>
                <code className='text-xs text-gray-800'>
                  {oldSpecification
                    ? JSON.stringify(oldSpecification, null, 2)
                    : ""}
                </code>
              </pre>
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Số lượng*
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
              Chỉnh sửa sản phẩm
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  );
};

export default EditProduct;

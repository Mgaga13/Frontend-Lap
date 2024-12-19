import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUpload } from "react-icons/fi";

const CreateProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    oldPrice: 0,
    description: "",
    quantity: 0,
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3"
  );
  const [errors, setErrors] = useState<any>({});

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
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader: any = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
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
    if (!image) {
      newErrors.image = "Product image is required";
    }
    return newErrors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields!");
      return;
    }

    console.log("Form Data:", { ...formData, image });
    toast.success("Product created successfully!");

    setFormData({
      name: "",
      price: 0,
      oldPrice: 0,
      description: "",
      quantity: 0,
    });
    setImage(null);
    setPreviewUrl(
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3"
    );
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Product Name*
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

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Price*
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
                Old Price
              </label>
              <input
                type='number'
                name='oldPrice'
                value={formData.oldPrice}
                onChange={handleInputChange}
                step='0.01'
                min='0'
                placeholder='0.00'
                className='mt-1 block w-full rounded-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Product Image*
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                errors.image ? "border-red-500" : "border-gray-300"
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
                />
                <label
                  htmlFor='file-upload'
                  className='cursor-pointer py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  Select Image
                </label>
              </div>
            </div>
            {previewUrl && (
              <div className='mt-4'>
                <img
                  src={previewUrl}
                  alt='Preview'
                  className='h-32 w-32 object-cover rounded-md'
                />
              </div>
            )}
            {errors.image && (
              <p className='mt-1 text-sm text-red-500'>{errors.image}</p>
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
              maxLength={300}
              rows={4}
              placeholder='Enter product description'
              className={`mt-1 block w-full rounded-md border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            />
            <p className='mt-1 text-sm text-gray-500'>
              {formData.description.length}/300 characters
            </p>
            {errors.description && (
              <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
            )}
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

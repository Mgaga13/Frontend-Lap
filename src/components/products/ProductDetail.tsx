import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProduct } from "../../services/react-query/query/product";
import { FaShoppingCart } from "react-icons/fa";
import { useCreateCart } from "../../services/react-query/query/cart";
import ProductReview from "./ProductReviews";
import { formatVND } from "../../utils/formatprice";

const ProductDetail = () => {
  const router = useNavigate();
  const { id } = useParams();
  const { mutate: createCart } = useCreateCart();

  const { data: productData, isLoading } = useGetProduct(id || "");

  const [selectedImage, setSelectedImage] = useState<number>(0); // Chỉ lưu index ảnh chính

  if (!id) {
    return <div>Product not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  const {
    name,
    price,
    oldprice,
    image: productImages,
    description,
    specification,
    feedbacks,
  } = productData;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de";
    e.currentTarget.alt = "Product fallback image";
  };
  const addTocart = () => {
    createCart(
      {
        productId: id,
      },
      {
        onSuccess: () => {
          router("/cart");
        },
      }
    );
  };
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg'>
      {/* Main Image Section */}
      <div className='relative overflow-hidden rounded-lg'>
        <img
          src={productImages[selectedImage]} // Hiển thị ảnh chính dựa vào index được chọn
          alt={name}
          onError={handleImageError}
          className='w-full h-[500px] object-contain transition-transform duration-300'
        />
      </div>

      {/* Thumbnail Section */}
      <div className='mt-4 flex space-x-4 justify-center'>
        {productImages.map((image: any, index: any) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)} // Cập nhật index của ảnh chính
            className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
              selectedImage === index ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className='w-20 h-20 object-cover'
              onError={handleImageError}
            />
          </div>
        ))}
      </div>

      {/* Product Info Section */}
      <div className='mt-6'>
        <h2 className='text-3xl font-bold text-gray-800 mb-4' aria-label={name}>
          {name}
        </h2>
        <p
          className='text-gray-600 mb-6 leading-relaxed'
          aria-label={description}
        >
          {description}
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <span className='text-2xl font-bold text-gray-900'>
              {formatVND(price)}
            </span>
            {oldprice !== "0" && (
              <span className='text-sm text-gray-500 line-through'>
                {formatVND(oldprice)}
              </span>
            )}
          </div>
          <button
            onClick={addTocart}
            aria-label='Add to cart'
            className='flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            <FaShoppingCart className='text-xl' />
            <span>Thêm vào giỏ hàng</span>
          </button>
        </div>
        <div className='mt-8'>
          <h3 className='text-2xl font-bold text-gray-800 mb-4'>
            Thông số kỹ thuật
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            {specification
              ? Object?.entries(specification)?.map(
                  ([label, value]: any, index) => (
                    <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='font-semibold text-gray-800'>{label}</h4>
                      <p className='text-gray-600'>{value}</p>
                    </div>
                  )
                )
              : ""}
          </div>
        </div>
        <ProductReview feedbacks={feedbacks} productId={id} />
      </div>
    </div>
  );
};

export default ProductDetail;

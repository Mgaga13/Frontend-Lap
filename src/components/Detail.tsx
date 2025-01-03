import React, { useState } from "react";
import {
  FaShoppingCart,
  FaStar,
  FaTag,
  FaPercent,
  FaShippingFast,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";

const ProductDetail = ({ product }: any) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { title, description, price, image, rating, discount } = product;

  const productImages = [
    image,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
  ];

  const specifications = [
    { label: "Brand", value: "TechPro" },
    { label: "Model", value: "XH-2000" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
    { label: "Battery Life", value: "Up to 20 hours" },
    { label: "Warranty", value: "1 Year" },
  ];

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Images Section */}
        <div className='space-y-4'>
          <div className='aspect-w-16 aspect-h-16 w-full rounded-lg overflow-hidden'>
            <img
              src={productImages[selectedImage]}
              alt={title}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-indigo-600" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className='space-y-6'>
          <div className='flex justify-between items-start'>
            <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className='p-2 hover:bg-gray-100 rounded-full'
            >
              {isFavorite ? (
                <FaHeart className='text-red-500 text-2xl' />
              ) : (
                <FaRegHeart className='text-gray-400 text-2xl' />
              )}
            </button>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  } text-lg`}
                />
              ))}
              <span className='ml-2 text-gray-600'>({rating}/5)</span>
            </div>
            <button className='flex items-center text-gray-600 hover:text-indigo-600'>
              <FaShareAlt className='mr-2' />
              Share
            </button>
          </div>

          <p className='text-gray-600 text-lg'>{description}</p>

          <div className='border-t border-b py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                {discount ? (
                  <>
                    <span className='text-3xl font-bold text-indigo-600'>
                      ${(price - (price * discount) / 100).toFixed(2)}
                    </span>
                    <span className='text-lg text-gray-500 line-through'>
                      ${price}
                    </span>
                  </>
                ) : (
                  <span className='text-3xl font-bold text-indigo-600'>
                    ${price}
                  </span>
                )}
              </div>
              {discount && (
                <div className='bg-red-500 text-white px-3 py-1 rounded-full flex items-center'>
                  <FaPercent className='mr-1' />
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center space-x-4'>
              <label className='text-gray-700'>Quantity:</label>
              <div className='flex items-center border rounded-lg'>
                <button
                  className='px-3 py-1 border-r hover:bg-gray-100'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className='px-4 py-1'>{quantity}</span>
                <button
                  className='px-3 py-1 border-l hover:bg-gray-100'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className='w-full bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition duration-300'
              onClick={() => console.log("Added to cart:", title)}
            >
              <FaShoppingCart className='text-lg' />
              Thêm vào giỏ hàng
            </button>
          </div>

          <div className='border-t pt-6'>
            <h3 className='text-lg font-semibold mb-4'>Thông số kỹ thuật</h3>
            <div className='grid grid-cols-2 gap-4'>
              {specifications.map((spec, index) => (
                <div key={index} className='flex justify-between'>
                  <span className='text-gray-600'>{spec.label}:</span>
                  <span className='font-medium'>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      title: "Wireless Headphones",
      description:
        "High-quality wireless headphones with noise cancellation feature and premium sound quality. Experience crystal-clear audio and immersive sound experience with these comfortable and stylish headphones.",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
      rating: 4.5,
      discount: 15,
      category: "audio",
    },
    {
      title: "Smart Watch",
      description:
        "Advanced smartwatch with health monitoring and fitness tracking capabilities.",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3",
      rating: 4.8,
      category: "wearables",
    },
    {
      title: "Bluetooth Speaker",
      description:
        "Portable wireless speaker with exceptional sound quality and long battery life.",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3",
      rating: 4.2,
      discount: 20,
      category: "audio",
    },
    {
      title: "Wireless Earbuds",
      description:
        "True wireless earbuds with premium sound and long battery life.",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1590658006821-04f4008d5717?ixlib=rb-4.0.3",
      rating: 4.6,
      category: "audio",
    },
    {
      title: "Fitness Tracker",
      description:
        "Advanced fitness band with heart rate monitoring and sleep tracking.",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?ixlib=rb-4.0.3",
      rating: 4.3,
      discount: 10,
      category: "wearables",
    },
    {
      title: "Smart Display",
      description:
        "HD smart display with voice control and smart home integration.",
      price: 229.99,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3",
      rating: 4.7,
      category: "smart-home",
    },
  ];

  // Example usage of ProductDetail
  return <ProductDetail product={products[0]} />;
};

export default SalesPage;

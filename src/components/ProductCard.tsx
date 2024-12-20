import React from "react";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";
import { useCreateCart } from "../services/react-query/query/cart";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  const router = useNavigate();
  const { UserSlice, AuthSlice } = useStore();
  const { title, description, price, image, oldprice, id } = product;
  const { mutate: createCart } = useCreateCart();

  const handleAddToCart = () => {
    if (!UserSlice.isLoggedIn) {
      router("/sign-in");
    }
    // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
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
    <div className='max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105'>
      <div className='relative h-48 overflow-hidden'>
        <img src={image} alt={title} className='w-full h-full object-cover' />
      </div>

      <div className='p-4'>
        <h2 className='text-lg font-bold mb-2 text-gray-800'>{title}</h2>
        <p className='text-gray-600 text-sm mb-4 text-ellipsis h-14 overflow-hidden line-clamp-3'>
          {description}
        </p>

        <div className='flex items-center gap-2 mb-4'>
          {oldprice != 0 && ( // Hiển thị giá cũ nếu có
            <span className='text-sm text-red-500 line-through'>
              ${oldprice.toFixed(2)}
            </span>
          )}
          <span className='text-xl font-bold text-indigo-600'>
            ${price.toFixed(2)}
          </span>
        </div>

        <button
          className='bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg block w-full hover:bg-indigo-700 transition duration-300'
          onClick={handleAddToCart}
        >
          <FaShoppingCart className='text-base inline-block mr-2' />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

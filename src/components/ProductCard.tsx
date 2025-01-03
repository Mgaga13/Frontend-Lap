import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCreateCart } from "../services/react-query/query/cart";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { formatVND } from "../utils/formatprice";
import { SearchContext } from "./Layout";

const ProductCard = ({ product }: any) => {
  const { setTotalCart } = useContext(SearchContext);

  const router = useNavigate();
  const { UserSlice, AuthSlice } = useStore();
  const {
    products_name,
    products_description,
    products_price,
    products_image,
    products_oldprice,
    products_id,
    averageRating,
  } = product;
  const { mutate: createCart } = useCreateCart();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!UserSlice.isLoggedIn) {
      router("/login");
    }
    setTotalCart((prevTotal) => prevTotal + 1);
    createCart(
      {
        productId: products_id,
      },
      {
        onSuccess: () => {
          router("/cart");
        },
      }
    );
  };

  const handleProductClick = () => {
    router(`/products/${products_id}`);
  };

  return (
    <div
      className='max-w-xs rounded-lg cursor-pointer overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105'
      onClick={handleProductClick}
    >
      <div className='relative h-48 overflow-hidden'>
        <img
          src={products_image?.split(",")[0] ?? products_image}
          alt={products_name}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-4'>
        <h2 className='text-gray-600 text-sm mb-4 text-ellipsis h-14 overflow-hidden line-clamp-3'>
          {products_name}
        </h2>

        <div className='flex items-center text-yellow-500 text-sm mb-2'>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={
                index < Math.round(averageRating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
          <span className='ml-2 text-gray-600'>
            ({averageRating.toFixed(1)})
          </span>
        </div>

        <div className='gap-2 mb-4'>
          {products_oldprice != 0 && (
            <span className='text-sm text-red-500 line-through'>
              {formatVND(products_oldprice)}
            </span>
          )}
          <br />
          <span className='text-xl font-bold text-indigo-600'>
            {formatVND(products_price ?? "")}
          </span>
        </div>

        <button
          className='bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg block w-full hover:bg-indigo-700 transition duration-300'
          onClick={handleAddToCart}
        >
          <FaShoppingCart className='text-base inline-block mr-2' />
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

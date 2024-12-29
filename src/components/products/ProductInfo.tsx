import React, { useState } from "react";
import { formatVND } from "../../utils/formatprice";
interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
}

const ProductInfo = (props: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Logic for adding the product to the cart
    console.log(`Added ${quantity} of ${name} to the cart.`);
  };

  const handleBuyNow = () => {
    // Logic for immediate purchase
    console.log(`Buying ${quantity} of ${name} now.`);
  };

  return (
    <div>
      <h1 className='text-2xl md:text-4xl font-bold mb-4'>{props.name}</h1>
      <p className='text-gray-700 text-lg mb-4'>{props.description}</p>
      <p className='text-3xl font-semibold text-red-500 mb-4'>
        {formatVND(props.price)} VND
      </p>

      {/* Quantity selection */}
      <div className='mb-4'>
        <label className='block text-lg font-semibold mb-2' htmlFor='quantity'>
          Số lượng còn lại: {props.quantityInStock}
        </label>
        <input
          id='quantity'
          type='number'
          min='1'
          max={props.quantityInStock}
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          className='border border-gray-300 p-2 rounded-lg w-20 text-center'
        />
      </div>

      {/* Action buttons */}
      <div className='flex space-x-4'>
        <button
          onClick={handleAddToCart}
          className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition'
        >
          Thêm vào giỏ hàng
        </button>
        <button
          onClick={handleBuyNow}
          className='px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition'
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;

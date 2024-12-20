import React, { useState } from "react";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("Đen");

  const handleAddToCart = () => {
    console.log("Số lượng:", quantity);
    console.log("Màu sắc:", color);
    alert(`Đã thêm vào giỏ hàng: ${quantity} sản phẩm màu ${color}`);
  };

  const handleBuyNow = () => {
    console.log("Mua ngay:", { quantity, color });
    alert(`Mua ngay: ${quantity} sản phẩm màu ${color}`);
  };

  return (
    <div>
      <h1 className='text-2xl md:text-4xl font-bold mb-4'>Tên sản phẩm</h1>
      <p className='text-gray-700 text-lg mb-4'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus ea
        officia totam adipisci commodi minima vitae beatae in, reprehenderit
        veritatis sunt quae quisquam quibusdam libero quod consectetur nemo
        atque illo!
      </p>
      <p className='text-3xl font-semibold text-red-500 mb-4'>1,500,000 VND</p>

      {/* Số lượng */}
      <div className='mb-4'>
        <label className='block text-lg font-semibold mb-2' htmlFor='quantity'>
          Số lượng: 30
        </label>
        <input
          id='quantity'
          type='number'
          min='1'
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          className='border border-gray-300 p-2 rounded-lg w-20 text-center'
        />
      </div>
      {/* Nút hành động */}
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

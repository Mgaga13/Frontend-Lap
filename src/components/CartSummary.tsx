import React from "react";

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-lg font-medium text-gray-900 mb-4'>
        Tóm tắt đơn hàng
      </h2>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Tổng phụ</span>
          <span className='text-gray-900'>${subtotal?.toFixed(2)}</span>
        </div>
        <div className='border-t pt-4'>
          <div className='flex justify-between'>
            <span className='text-lg font-medium text-gray-900'>Tổng cộng</span>
            <span className='text-lg font-medium text-gray-900'>
              ${subtotal?.toFixed(2)}
            </span>
          </div>
        </div>
        <button className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200'>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartSummary;

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      productName: "Sản phẩm A",
      quantity: 2,
      price: 100000,
      productId: 123,
    },
    {
      id: 2,
      productName: "Sản phẩm B",
      quantity: 1,
      price: 200000,
      productId: 124,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRating = (productId: any) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleSubmitReview = () => {
    console.log("Đánh giá sản phẩm", {
      productId: selectedProductId,
      rating,
      comment,
    });
    setIsModalOpen(false);
  };

  return (
    <div className='p-6 content'>
      <h1 className='text-2xl font-bold mb-4'>Lịch Sử Mua Hàng</h1>
      <div className='space-y-4'>
        {orders.map((order) => (
          <div
            key={order.id}
            className='flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md'
          >
            <div className='flex flex-col'>
              <span className='font-medium text-lg'>{order.productName}</span>
              <span className='text-sm text-gray-600'>
                Số lượng: {order.quantity}
              </span>
              <span className='text-sm text-gray-600'>
                Tổng giá:{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.price * order.quantity)}
              </span>
            </div>
            <button
              onClick={() => handleRating(order.productId)}
              className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
            >
              Đánh giá sản phẩm
            </button>
          </div>
        ))}
      </div>

      {/* Modal đánh giá sản phẩm */}
      {isModalOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl font-semibold mb-4'>Đánh giá sản phẩm</h2>
            <div className='flex items-center mb-4'>
              <span className='mr-2'>Số sao:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Nội dung đánh giá'
              className='w-full p-2 border rounded-md mb-4'
            />
            <div className='flex justify-end'>
              <button
                onClick={handleSubmitReview}
                className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'
              >
                Gửi đánh giá
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className='ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

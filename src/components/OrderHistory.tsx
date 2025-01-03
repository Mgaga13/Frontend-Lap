import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Import biểu tượng
import { useGetListOrderUser } from "../services/react-query/query/user";
import { formatVND } from "../utils/formatprice";
import { useCreateFeedback } from "../services/react-query/query/feedback";

function statusOrder(status: number) {
  if (status == 0) return "Xử lý";
  if (status == 1) return "Đang vận chuyển";
  if (status == 2) return "Thành công";
}

const OrderHistory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: listOrder, isLoading } = useGetListOrderUser({
    limit,
    page,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { mutate: createFeedback } = useCreateFeedback();
  const handleToggleAccordion = (orderId: string) => {
    setOpenAccordion((prev) => (prev === orderId ? null : orderId));
  };

  const handleRating = (productId: any) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleSubmitReview = () => {
    createFeedback({
      content: comment,
      productId: selectedProductId + "",
      star: rating,
    });

    setIsModalOpen(false);
  };

  return (
    <div className='p-6 content'>
      <h1 className='text-2xl font-bold mb-4'>Lịch Sử Giao dịch</h1>
      <div className='space-y-4'>
        {listOrder?.datas?.map((order: any) => (
          <div key={order.id} className='border rounded-lg shadow-md'>
            {/* Accordion Header */}
            <div
              className='flex justify-between items-center bg-gray-200 p-4 cursor-pointer'
              onClick={() => handleToggleAccordion(order.id)}
            >
              <div>
                <span className='block font-medium text-lg'>
                  Thông tin đơn hàng
                </span>
                <span className='block text-gray-600'>
                  Hình thức thanh toán:{" "}
                  {order.paymentMethod === "COD"
                    ? "Thanh toán khi nhận hàng"
                    : "Thanh toán online"}
                </span>
                <span className='text-sm text-gray-600'>
                  Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              {/* Biểu tượng mũi tên */}
              <span className='text-lg'>
                {openAccordion === order.id ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </span>
            </div>
            {/* Accordion Body */}
            {openAccordion === order.id && (
              <div className='bg-white p-4 space-y-2'>
                {order.orderDetails?.length > 0 ? (
                  order.orderDetails.map((detail: any) => (
                    <div
                      key={detail.id}
                      className='flex justify-between items-center border-b py-2'
                    >
                      <div>
                        <span className='block font-medium'>
                          Sản phẩm: {detail.product.name}
                        </span>
                        <span className='block font-medium'>
                          Trạng thái: {statusOrder(detail.status)}
                        </span>
                        <span className='text-sm text-gray-600'>
                          Giá: {formatVND(detail.price)}
                        </span>
                      </div>
                      {detail.status == 2 ? (
                        <button
                          onClick={() => handleRating(detail.product.id)}
                          className='bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600'
                        >
                          Đánh giá
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  ))
                ) : (
                  <div className='text-sm text-gray-500'>
                    Không có sản phẩm nào trong đơn hàng này.
                  </div>
                )}
              </div>
            )}
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

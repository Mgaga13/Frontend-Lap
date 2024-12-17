import React from "react";

const ProductReviews = () => {
  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      comment: "Bàn phím rất tốt, cảm giác gõ tuyệt vời!",
      rating: 5,
    },
    {
      id: 2,
      user: "Trần Thị B",
      comment: "Độ nảy tốt, thiết kế đẹp mắt.",
      rating: 4,
    },
    {
      id: 3,
      user: "Lê Minh C",
      comment: "Phù hợp cho dân văn phòng và lập trình.",
      rating: 5,
    },
  ];

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Đánh giá người mua</h2>
      <div className='space-y-4'>
        {reviews.map((review) => (
          <div key={review.id} className='border p-4 rounded-lg shadow-sm'>
            <p className='font-semibold'>{review.user}</p>
            <p className='text-gray-600'>{review.comment}</p>
            <p className='text-yellow-500'>Đánh giá: {review.rating} ⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;

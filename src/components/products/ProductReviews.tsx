import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  useCreateFeedback,
  useGetFeedback,
} from "../../services/react-query/query/feedback";
import { useNavigate, useParams } from "react-router-dom";

const ProductReview = ({ feedbacks }: any) => {
  const { id } = useParams();
  const { mutate: createFeedBack } = useCreateFeedback();
  const [formData, setFormData] = useState({
    star: 0,
    content: "",
  });
  const { data: list, isLoading, refetch } = useGetFeedback(id || "");
  console.log(list);
  const [hover, setHover] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-4xl mx-auto p-4 md:p-8'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Đánh giá</h1>

      {/* Feedback List */}
      <div className='space-y-6'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>
          Danh sách đánh giá
        </h2>
        {list.map((feedback: any) => (
          <div key={feedback.id} className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center mb-2'>
              <div className='flex space-x-1'>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className='w-5 h-5'
                    color={index + 1 <= feedback.star ? "#fbbf24" : "#e5e7eb"}
                  />
                ))}
              </div>
              <span className='ml-2 text-gray-500 text-sm'>
                {new Date(feedback.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className='text-gray-700'>{feedback.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  useCreateFeedback,
  useGetFeedback,
} from "../../services/react-query/query/feedback";
import { useNavigate, useParams } from "react-router-dom";

const ProductReview = ({ feedbacks, productId }: any) => {
  const router = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.star === 0 || formData.content.trim() === "") {
      setError("Please provide both rating and review text.");
      return;
    }

    setError("");
    setLoading(true);
    createFeedBack(
      {
        content: formData.content,
        productId: productId,
        star: formData.star,
      },
      {
        onSuccess: (response) => {
          refetch();
          setFormData({ star: 0, content: "" });
          setHover(null);
        },
      }
    );
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!list) {
    return <div>Không có đánh giá</div>;
  }
  return (
    <div className='max-w-4xl mx-auto p-4 md:p-8'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Đánh giá</h1>

      {/* Feedback Form */}
      <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>
          Viết đánh giá ở đây
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-2'>Sao</label>
            <div className='flex space-x-1'>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    type='button'
                    key={index}
                    className='focus:outline-none'
                    onClick={() =>
                      setFormData({ ...formData, star: ratingValue })
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <FaStar
                      className='w-8 h-8'
                      color={
                        ratingValue <= (hover || formData.star)
                          ? "#fbbf24"
                          : "#e5e7eb"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className='block text-gray-700 mb-2'>Nội dung</label>
            <textarea
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={4}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder='Share your thoughts about the product...'
            ></textarea>
          </div>

          {error && <div className='text-red-500 text-sm'>{error}</div>}

          <button
            type='submit'
            className='w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

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

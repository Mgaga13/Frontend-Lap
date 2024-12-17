import React from "react";

interface DeleteConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'
      onClick={onCancel}
    >
      <div
        className='bg-white p-6 rounded-lg shadow-xl w-96'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-bold mb-4'>{message}</h2>
        <div className='flex justify-between'>
          <button
            onClick={onConfirm}
            className='p-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Có
          </button>
          <button
            onClick={onCancel}
            className='p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

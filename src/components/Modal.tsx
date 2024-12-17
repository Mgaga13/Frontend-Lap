import React from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='bg-white p-6 rounded-lg shadow-xl w-96'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-2xl font-bold mb-4'>{title}</h2>
        {children}
        <button
          onClick={onClose}
          className='mt-4 p-2 w-full bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

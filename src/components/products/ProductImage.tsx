import React from "react";

const ProductImage = () => {
  return (
    <div className='flex justify-center items-center'>
      <img
        src='https://via.placeholder.com/400'
        alt='Product'
        className='w-full h-auto max-w-md object-cover rounded-lg shadow-lg'
      />
    </div>
  );
};

export default ProductImage;

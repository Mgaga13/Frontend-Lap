import React from "react";

const ProductSpecifications = () => {
  const specifications = {
    brand: "Logitech",
    model: "MX Keys",
    type: "Mechanical",
    switch: "Tactile",
    connectivity: "Wireless",
    warranty: "12 months",
  };

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Thông số kỹ thuật</h2>
      <ul className='space-y-2'>
        {Object.entries(specifications).map(([key, value]) => (
          <li key={key} className='flex justify-between'>
            <span className='font-medium capitalize'>{key}:</span>
            <span className='text-gray-700'>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSpecifications;

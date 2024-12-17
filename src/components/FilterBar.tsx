import React, { useState } from "react";

const FilterBar = ({ onFilter }: any) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [rating, setRating] = useState(0);

  const brands = ["Apple", "Samsung", "Sony", "Xiaomi", "LG"]; // Dummy brand data

  const handlePriceChange = (e: any) => {
    const { name, value } = e.target;
    setPriceRange((prev) =>
      name === "min" ? [Number(value), prev[1]] : [prev[0], Number(value)]
    );
  };

  const handleBrandChange = (e: any) => {
    setSelectedBrand(e.target.value);
  };

  const handleRatingChange = (e: any) => {
    setRating(Number(e.target.value));
  };

  const handleApplyFilters = () => {
    onFilter({ priceRange, selectedBrand, rating });
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-md space-y-4'>
      {/* Filter by Price */}
      <div>
        <h3 className='font-medium text-lg mb-2'>Khoảng giá</h3>
        <div className='flex gap-2'>
          <input
            type='number'
            name='min'
            placeholder='Min'
            value={priceRange[0]}
            onChange={handlePriceChange}
            className='w-full px-3 py-2 border rounded-lg'
          />
          <input
            type='number'
            name='max'
            placeholder='Max'
            value={priceRange[1]}
            onChange={handlePriceChange}
            className='w-full px-3 py-2 border rounded-lg'
          />
        </div>
      </div>

      {/* Filter by Brand */}
      <div>
        <h3 className='font-medium text-lg mb-2'>Nhãn hàng</h3>
        <select
          value={selectedBrand}
          onChange={handleBrandChange}
          className='w-full px-3 py-2 border rounded-lg'
        >
          <option value=''>Chọn nhãn hàng</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Filter by Rating */}
      <div>
        <h3 className='font-medium text-lg mb-2'>Đánh giá</h3>
        <select
          value={rating}
          onChange={handleRatingChange}
          className='w-full px-3 py-2 border rounded-lg'
        >
          <option value={0}>Tất cả</option>
          <option value={1}>1 sao trở lên</option>
          <option value={2}>2 sao trở lên</option>
          <option value={3}>3 sao trở lên</option>
          <option value={4}>4 sao trở lên</option>
          <option value={5}>5 sao</option>
        </select>
      </div>

      {/* Apply Filters */}
      <button
        onClick={handleApplyFilters}
        className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg'
      >
        Áp dụng
      </button>
    </div>
  );
};

export default FilterBar;

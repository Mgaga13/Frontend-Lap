import React, { useState, useEffect } from "react";
import { FaDollarSign, FaTags, FaFilter } from "react-icons/fa";
import { useGetListBrand } from "../services/react-query/query/brand";
import { useGetListCategory } from "../services/react-query/query/category";

interface FilterProps {
  onFilter: (filters: {
    category?: string;
    brand?: string;
    priceRange?: string;
  }) => void;
}

const FilterBar: React.FC<FilterProps> = ({ onFilter }) => {
  const { data: categoryData } = useGetListCategory({
    page: 1,
    limit: 10,
    searchText: "",
  });
  const { data: brandData } = useGetListBrand({
    page: 1,
    limit: 10,
  });

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: "all",
  });

  const priceRanges = [
    { label: "All", value: "all" },
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Above $200", value: "200+" },
  ];

  // Update parent component whenever filters change
  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className='bg-white p-6 rounded-xl shadow-md'>
      <div className='flex items-center mb-4'>
        <FaFilter className='text-indigo-500 mr-2' />
        <h3 className='text-lg font-medium text-gray-900'>Filters</h3>
      </div>

      <div className='space-y-4'>
        <div className='flex flex-wrap gap-4'>
          {/* Category Filter */}
          <div className='flex-1 min-w-[200px]'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <FaTags className='inline mr-2' />
              Category
            </label>
            <select
              name='category'
              value={filters.category}
              onChange={handleFilterChange}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option value=''>All Categories</option>
              {categoryData?.datas.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className='flex-1 min-w-[200px]'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Brand
            </label>
            <select
              name='brand'
              value={filters.brand}
              onChange={handleFilterChange}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option value=''>All Brands</option>
              {brandData?.datas.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className='flex-1 min-w-[200px]'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <FaDollarSign className='inline mr-2' />
              Price Range
            </label>
            <select
              name='priceRange'
              value={filters.priceRange}
              onChange={handleFilterChange}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

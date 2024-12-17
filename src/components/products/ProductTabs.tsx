import React, { useState } from "react";

import ProductReviews from "./ProductReviews";
import ProductSpecifications from "./ProductSpecifications";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("specifications");

  return (
    <div className='container mx-auto'>
      {/* Tabs Header */}
      <div className='flex border-b'>
        <button
          onClick={() => setActiveTab("specifications")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "specifications"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Thông số kỹ thuật
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "reviews"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Đánh giá người mua
        </button>
      </div>

      {/* Tabs Content */}
      <div className='mt-4'>
        {activeTab === "specifications" && <ProductSpecifications />}
        {activeTab === "reviews" && <ProductReviews />}
      </div>
    </div>
  );
};

export default ProductTabs;

import React from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

const ProductDetail = () => {
  return (
    <div className='content mx-auto pt-4'>
      <div className='mx-auto flex flex-col md:flex-row justify-between items-start gap-8'>
        {/* Hình ảnh sản phẩm */}
        <div className='w-full md:w-1/2'>
          <ProductImage />
        </div>

        {/* Thông tin sản phẩm */}
        <div className='w-full md:w-1/2'>
          <ProductInfo />
        </div>
      </div>

      {/* Đánh giá sản phẩm */}
      <div className='mt-8'>
        <ProductTabs />
      </div>
    </div>
  );
};

export default ProductDetail;

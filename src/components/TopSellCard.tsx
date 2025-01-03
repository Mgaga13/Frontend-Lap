import React, { useRef } from "react";
import ProductCard from "./ProductCard";

const TopSellingProducts = ({
  topFiveSellProduct,
}: {
  topFiveSellProduct: any[];
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = x - startX; // Calculate distance dragged
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div
        className='flex gap-4 overflow-x-hidden overflow-y-hidden cursor-grab active:cursor-grabbing'
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the element
      >
        {topFiveSellProduct.map((product: any) => (
          <div key={product.id} className='product-card w-72 flex-shrink-0'>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;

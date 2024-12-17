import React from "react";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }: any) => {
  const { title, description, price, image } = product;

  return (
    <div className='max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105'>
      <div className='relative h-64 overflow-hidden'>
        <img src={image} alt={title} className='w-full h-full object-cover' />
      </div>

      <div className='p-6'>
        <h2 className='text-xl font-bold mb-2 text-gray-800'>{title}</h2>
        <p className='text-gray-600 text-sm mb-4'>{description}</p>

        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold text-indigo-600'>
            ${price.toFixed(2)}
          </span>
          <button
            className='bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition duration-300'
            onClick={() => console.log("Added to cart:", title)}
          >
            <FaShoppingCart className='text-lg' />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage with dummy data
const ExampleProductGrid = () => {
  const products = [
    {
      title: "Wireless Headphones",
      description:
        "High-quality wireless headphones with noise cancellation feature and premium sound quality.",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
    },
    {
      title: "Smart Watch",
      description:
        "Advanced smartwatch with health monitoring and fitness tracking capabilities.",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3",
    },
    {
      title: "Bluetooth Speaker",
      description:
        "Portable wireless speaker with exceptional sound quality and long battery life.",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3",
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ExampleProductGrid;

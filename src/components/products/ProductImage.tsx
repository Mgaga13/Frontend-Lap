import React, { useState } from "react";

// Define prop types for ProductImage
interface ProductImageProps {
  images: string[]; // An array of image URLs
}

const ProductImage = ({ images }: ProductImageProps) => {
  // State to store the selected large image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div>
      {/* Large image */}
      <div className='flex justify-center items-center mb-4'>
        <img
          src={selectedImage}
          alt='Product'
          className='w-full h-auto max-w-md object-cover rounded-lg shadow-lg'
        />
      </div>

      {/* Thumbnail images */}
      <div className='flex justify-center gap-4'>
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className='w-16 h-16 cursor-pointer'
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              className='w-full h-full object-cover rounded-lg border-2 border-gray-300 hover:border-blue-500 transition'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;

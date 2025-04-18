"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const router = useRouter();

  const handlePrevImage = (event) => {
    event.stopPropagation(); // Stop the event from bubbling up

    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const handleNextImage = (event) => {
    event.stopPropagation(); // Stop the event from bubbling up

    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleNavigate = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative bg-white rounded-lg shadow-md p-4 cursor-pointer"
    >
      <div className="relative">
        <div className="relative w-full h-48">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.title}
            width={500} // Set a reasonable width for your use case
            height={300} // Set a reasonable height for your use case
            className="rounded-lg object-cover"
            style={{ width: "100%", height: "12rem" }} // Ensures the image fills the container
          />
        </div>

        {/* <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg"
        /> */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r hover:bg-gray-700"
            >
              &#8249; {/* Left Arrow */}
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l hover:bg-gray-700"
            >
              &#8250; {/* Right Arrow */}
            </button>
          </>
        )}
      </div>
      <h3 className="text-xl font-semibold mt-4">{product.title}</h3>
      <p className="text-lg text-gray-700">${product.price.toFixed(2)}</p>
      <p className="text-md text-yellow-500">Rating: {product.rating}</p>
    </div>
  );
}

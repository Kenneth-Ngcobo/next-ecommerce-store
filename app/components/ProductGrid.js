"use client"; // Add this if ProductGrid has client-side interactivity

import ProductCard from "./ProductCard";

export default function ProductGrid({ products, currentPage }) {
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">
        Product Grid - Page {currentPage}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-8">
        <a
          href={`/products?page=${currentPage - 1}`}
          className={`px-4 py-2 bg-gray-700 text-white rounded-lg mr-2 ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </a>
        <a
          href={`/products?page=${currentPage + 1}`}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
          Next
        </a>
      </div>
    </div>
  );
}

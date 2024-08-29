"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Filters({
  currentSearch,
  currentCategory,
  currentSort,
}) {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(currentSearch || "");
  const [selectedCategory, setSelectedCategory] = useState(
    currentCategory || ""
  );
  const [sortOrder, setSortOrder] = useState(currentSort || "asc");
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://next-ecommerce-api.vercel.app/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleApplyFilters = () => {
    // const params = new URLSearchParams();

    // if (searchTerm) params.set("search", searchTerm);
    // if (selectedCategory) params.set("category", selectedCategory);
    // if (sortOrder) params.set("sort", sortOrder);

    // router.push(`/products?${params.toString()}`);
    const slugParts = [];

    if (searchTerm) slugParts.push(`search-${searchTerm}`);
    if (selectedCategory) slugParts.push(`category-${selectedCategory}`);
    if (sortOrder) slugParts.push(`sortBy-price/order-${sortOrder}`);

    const slug = slugParts.length > 0 ? slugParts.join("/") : "all";

    router.push(`/products/filtered/${slug}`);
  };

  return (
    <div className="filters p-4 mb-6 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white p-2 rounded-lg"
      >
        Apply Filters
      </button>
    </div>
  );
}

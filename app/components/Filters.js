"use client"; // This is a client component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Filters({
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    onSearchChange(newSearch);
    router.push(`/products/${newSearch},${category},${sort}`);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    onCategoryChange(newCategory);
    router.push(`/products/${search},${newCategory},${sort}`);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    onSortChange(newSort);
    router.push(`/products/${search},${category},${newSort}`);
  };

  return (
    <div className="mb-4 flex flex-col gap-4">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="p-2 border rounded"
      />

      <select
        value={category}
        onChange={handleCategoryChange}
        className="p-2 border rounded"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={handleSortChange}
        className="p-2 border rounded"
      >
        <option value="default">Sort by</option>
        <option value="price-asc">Price Low to High</option>
        <option value="price-desc">Price High to Low</option>
        <option value="rating">Highest Rating</option>
      </select>
    </div>
  );
}

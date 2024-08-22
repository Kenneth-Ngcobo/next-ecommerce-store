"use client";

import React from "react";

export default function BackButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleBack}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Back
    </button>
  );
}

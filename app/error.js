"use client";
export default function ErrorPage({ error }) {
  console.error(error);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
      <p className="text-lg">
        We encountered an error while processing your request. Please try again
        later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Reload
      </button>
    </div>
  );
}

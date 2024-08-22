export default function LoadingPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      <p className="text-lg">Please wait while we load the content for you.</p>
      <div className="mt-4">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

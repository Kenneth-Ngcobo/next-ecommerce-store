import { notFound } from "next/navigation";
import BackButton from "../../components/BackButton"; // Adjust path as needed
import LoadingPage from "../../loading"; // Adjust path as needed
import ErrorPage from "../../error"; // Adjust path as needed

async function getProduct(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 60 }, // Cache revalidation time (adjust as needed)
    });
    if (!response.ok) {
      throw new Error("Product not found");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Product not found");
  }
}

export default async function ProductDetail({ params }) {
  const { id } = params;

  let product;
  try {
    product = await getProduct(id);
  } catch (error) {
    return <ErrorPage error={error.message} />;
  }

  if (!product) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Gallery */}
        <div className="flex flex-col items-center">
          <div className="relative w-full">
            <div className="flex overflow-x-scroll space-x-4 py-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg flex-shrink-0"
                />
              ))}
            </div>
            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between">
                <button className="bg-gray-800 text-white p-2 rounded-l hover:bg-gray-700">
                  &#8249; {/* Left Arrow */}
                </button>
                <button className="bg-gray-800 text-white p-2 rounded-r hover:bg-gray-700">
                  &#8250; {/* Right Arrow */}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-md text-yellow-500 mb-4">
            Rating: {product.rating}
          </p>
          <p className="text-md text-gray-600 mb-4">
            Category: {product.category}
          </p>
          <p className="text-md text-gray-600 mb-4">Stock: {product.stock}</p>
          <p className="text-md text-gray-600 mb-4">
            Warranty: {product.warrantyInformation}
          </p>
          <p className="text-md text-gray-600 mb-4">
            Shipping: {product.shippingInformation}
          </p>
          <p className="text-md text-gray-600 mb-4">
            Availability: {product.availabilityStatus}
          </p>
          <p className="text-md text-gray-600 mb-4">
            Minimum Order Quantity: {product.minimumOrderQuantity}
          </p>

          {/* Product Reviews */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {product.reviews.length > 0 ? (
              <ul className="space-y-4">
                {product.reviews.map((review, index) => (
                  <li key={index} className="border p-4 rounded-lg">
                    <p className="text-md font-semibold">
                      {review.reviewerName}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-800">{review.comment}</p>
                    <p className="text-sm text-yellow-500 mt-2">
                      Rating: {review.rating}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { id } = params;
  try {
    const product = await getProduct(id);
    return {
      title: product.title,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }
}

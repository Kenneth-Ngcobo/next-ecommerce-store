export async function fetchProducts(page) {
  console.log("fetchProducts");
  const PRODUCTS_PER_PAGE = 20;

  try {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${
        (page - 1) * PRODUCTS_PER_PAGE
      }`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch("https://next-ecommerce-api.vercel.app/categories"); //https://dummyjson.com/products/
    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

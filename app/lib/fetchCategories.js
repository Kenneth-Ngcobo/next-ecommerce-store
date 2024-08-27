export async function fetchCategories() {
  try {
    const res = await fetch("http://localhost:2000/categories"); //https://dummyjson.com/products/
    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

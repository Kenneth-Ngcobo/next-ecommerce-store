export async function fetchCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

export async function fetchProducts2(query, page) {
  console.log("fetchProducts2");
  const PRODUCTS_PER_PAGE = 20;
  const url = `http://localhost:2000/products?limit=${PRODUCTS_PER_PAGE}&skip=${
    (page - 1) * PRODUCTS_PER_PAGE
  }&?${query}`;
  console.log("fetchProducts2 url = ", url);
  try {
    //console.log("fetchProducts2 url = ", url);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    //console.log("data = ", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

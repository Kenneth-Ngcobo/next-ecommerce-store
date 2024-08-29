export async function fetchProducts(query, page) {
  const PRODUCTS_PER_PAGE = 20;
  let url = `https://next-ecommerce-api.vercel.app/products?limit=${PRODUCTS_PER_PAGE}&skip=${
    (page - 1) * PRODUCTS_PER_PAGE
  }`;
  if (query) {
    url = url + `&${query}`;
  }

  try {
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

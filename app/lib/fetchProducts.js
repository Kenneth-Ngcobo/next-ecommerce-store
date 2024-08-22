export async function fetchProducts(page) {
  const PRODUCTS_PER_PAGE = 20;
  const res = await fetch(
    `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${
      (page - 1) * PRODUCTS_PER_PAGE
    }`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.products;
}

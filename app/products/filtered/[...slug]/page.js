import { fetchProducts } from "../../../lib/fetchProducts";
import ProductGrid from "../../../components/ProductGrid";
import LoadingPage from "../../../loading";
import ErrorPage from "../../../error";

export default async function FilteredProductsPage({ params }) {
  //console.log("params = ", params);
  const { slug } = params;

  // Parsing slug to extract filters
  const searchParams = new URLSearchParams();
  //const slugParts = slug.split("/");

  let searchTerm = "";
  let selectedCategory = "";
  let sortBy = "";
  let sortOrder = "";

  slug.forEach((part) => {
    if (part.startsWith("search-")) {
      searchTerm = part.replace("search-", "");
    } else if (part.startsWith("category-")) {
      selectedCategory = part.replace("category-", "");
    } else if (part.startsWith("sortBy-")) {
      sortBy = part.replace("sortBy-", "");
    } else if (part.startsWith("order-")) {
      sortOrder = part.replace("order-", "");
    }
  });

  //console.log("selectedCategory = ", selectedCategory);

  // // Prepare query parameters for fetching products
  const query = new URLSearchParams({
    search: searchTerm,
    category: selectedCategory,
    sortBy: sortBy,
    order: sortOrder,
  }).toString();

  console.log("query = ", query);

  // Fetch filtered products
  try {
    const products = await fetchProducts(query, 1); // Modify fetchProducts to handle query parameters

    return <ProductGrid products={products} currentPage={1} />;
  } catch (error) {
    console.log("error = ", error);
    return <ErrorPage error={error} />;
  }
}

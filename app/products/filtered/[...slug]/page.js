import { fetchProducts2 } from "../../../lib/fetchProducts2";
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
  let sortOrder = "asc";

  slug.forEach((part) => {
    if (part.startsWith("search-")) {
      searchTerm = part.replace("search-", "");
    } else if (part.startsWith("category-")) {
      selectedCategory = part.replace("category-", "");
    } else if (part.startsWith("sort-")) {
      sortOrder = part.replace("sort-", "");
    }
  });

  //console.log("selectedCategory = ", selectedCategory);

  // // Prepare query parameters for fetching products
  const query = new URLSearchParams({
    search: searchTerm,
    category: selectedCategory,
    sort: sortOrder,
  }).toString();

  //console.log("query = ", query);

  // Fetch filtered products
  try {
    console.log("About to call fetchProducts2");
    const products = await fetchProducts2(query, 1); // Modify fetchProducts to handle query parameters
    console.log("slug products = ", products);
    return <ProductGrid products={products} currentPage={1} />;
  } catch (error) {
    console.log("error = ", error);
    return <ErrorPage error={error} />;
  }
}

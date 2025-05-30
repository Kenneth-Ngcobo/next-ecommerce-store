import { fetchProducts } from "./lib/fetchProducts";
import ProductGrid from "./components/ProductGrid";
import LoadingPage from "./loading";
import ErrorPage from "./error";

export default async function Home() {
  const page = 1; // Always start with page 1
  const products = await fetchProducts(null, page);
  //console.log("Home products = ", products);
  return <ProductGrid products={products} currentPage={page} />;
}

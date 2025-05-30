import { fetchProducts } from "../lib/fetchProducts";
import ProductGrid from "../components/ProductGrid";
import LoadingPage from "../loading";
import ErrorPage from "../error";

export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  const products = await fetchProducts(null, page);
  return <ProductGrid products={products} currentPage={page} />;
}

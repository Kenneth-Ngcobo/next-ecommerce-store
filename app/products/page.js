import { fetchProducts } from "../lib/fetchProducts";
import ProductGrid from "../components/ProductGrid";
import LoadingPage from "../loading";
import ErrorPage from "../error";

export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  try {
    const products = await fetchProducts(page);
    return <ProductGrid products={products} currentPage={page} />;
  } catch (error) {
    return <ErrorPage error={error} />;
  }
}

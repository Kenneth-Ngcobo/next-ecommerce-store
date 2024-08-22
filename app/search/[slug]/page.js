import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { getProducts } from "../../../lib/products"; // Utility function to fetch products

export default function ProductsSlugPage() {
  const router = useRouter();
  const { slug } = router.query; // Example slug-based routing

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (slug) {
      const [search, category, sort] = slug.split(",");

      const fetchProducts = async () => {
        const data = await getProducts(search, category, sort);
        setProducts(data);
      };

      fetchProducts();
    }
  }, [slug]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

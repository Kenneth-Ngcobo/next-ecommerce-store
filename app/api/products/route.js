import { fetchDBProducts } from "db/fetchDBProducts";
import Fuse from "fuse.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";
  const limitValue = parseInt(searchParams.get("limit")) || 20;
  const skipValue = parseInt(searchParams.get("skip")) || 0;
  const category = searchParams.get("category") || null;
  const searchTerm = searchParams.get("search") || null;

  try {
    let products = await fetchDBProducts({
      sortBy,
      order,
      limitValue,
      skipValue,
      category,
    });

    if (searchTerm) {
      const fuse = new Fuse(products, {
        keys: ["title"],
        threshold: 0.3,
      });
      products = fuse.search(searchTerm).map((result) => result.item);
    }

    if (products.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

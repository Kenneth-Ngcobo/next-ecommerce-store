import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";

export async function fetchDBProducts({
  sortBy,
  order,
  limitValue,
  skipValue,
  category,
}) {
  let q = query(collection(db, "products"));

  if (category) {
    q = query(q, where("category", "==", category));
  }

  q = query(q, orderBy(sortBy, order));

  if (skipValue > 0) {
    const skipQuerySnapshot = await getDocs(query(q, limit(skipValue)));
    const lastVisible =
      skipQuerySnapshot.docs[skipQuerySnapshot.docs.length - 1];
    q = query(q, startAfter(lastVisible));
  }

  q = query(q, limit(limitValue));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      discountPercentage: data.discountPercentage,
      rating: data.rating,
      stock: data.stock,
      tags: data.tags,
      brand: data.brand,
      sku: data.sku,
      images: data.images,
      thumbnail: data.thumbnail,
    };
  });
}

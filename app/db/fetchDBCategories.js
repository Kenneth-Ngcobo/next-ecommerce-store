import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchDBCategories() {
  const categoriesRef = doc(db, "categories", "allCategories");
  const categoriesSnap = await getDoc(categoriesRef);

  const categories = categoriesSnap.data().categories;
  return categories;
}

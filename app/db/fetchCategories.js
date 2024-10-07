import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
}

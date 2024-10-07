import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the import based on your file structure

// Function to fetch a product by ID from Firestore
export async function getDBProductById(id) {
  const numberId = parseInt(id);
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("id", "==", numberId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { message: "Product not found" };
    }

    // Assuming the ID is unique and you expect only one document
    const productSnap = querySnapshot.docs[0];
    const product = { id: productSnap.id, ...productSnap.data() };

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return { error: "Failed to fetch product" };
  }
}

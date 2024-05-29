import { API_URL } from "./constants";
import Home from "@/components/Home";

export async function getAllProducts() {
  const timestamp = new Date().getTime(); // Generate a unique timestamp
  const response = await fetch(`${API_URL}/products?size=100&timestamp=${timestamp}`, { cache: 'no-store' });
  return await response.json();
}

export default async function AppPage() {
  // const result = await getAllProducts();
  return (
    <Home />
  );
}

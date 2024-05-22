import { API_URL } from "./constants";
import Home from "@/components/Home";

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/products?size=100`, { cache: 'no-store' });
  return await response.json();
}

export default async function AppPage() {
  const result = await getAllProducts();
  const products = result.content;
  return (
    <Home products={products} />
  );
}

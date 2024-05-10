import ProductCard from "@/components/products/ProductCard/ProductCard";
import { API_URL } from "./constants";
import styles from "./page.module.css"

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);
  return await response.json();
}

export default async function AppPage() {
  const result = await getAllProducts();
  console.log(result);
  const products = result.content;

  return (
    <div>
      <div className={styles.mainBanner}></div>
      <ul className={styles.productList}>
        {
          products.map((product, index) => (
            <ProductCard product={product} />
          ))
        }
      </ul>
    </div>
  );
}

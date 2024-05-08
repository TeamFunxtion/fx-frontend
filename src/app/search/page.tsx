import ProductCard from "@/components/products/ProductCard/ProductCard";
import styles from "./page.module.css";
import ProductSearchFilter from "@/components/search/ProductSearchFilter";
import { API_URL } from "../constants";


export async function getProductList() {
	const response = await fetch(`${API_URL}/products`, { method: 'GET' });
	return response.json();
}

export default async function ProductsSearchPage() {
	const result = await getProductList();
	console.log(result);
	const productList = result.data;

	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2>상품 검색 결과</h2>
				{/* <button>초기화</button> */}
				<ProductSearchFilter />
			</div>
			<div className={styles.main}>
				<div>
					<ul className={styles.sortBar}>
						<li>추천순</li>
						<li>최신순</li>
						<li>낮은가격순</li>
						<li>높은가격순</li>
					</ul>
				</div>

				<ul className={styles.productList}>
					{
						productList.map((product, index) => (
							<ProductCard key={index} product={product} />
						))
					}
				</ul>
			</div>
		</section>
	)
}

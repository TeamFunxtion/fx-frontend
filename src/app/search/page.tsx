import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";
import ProductSearchFilter from "@/components/search/ProductSearchFilter";

export default function ProductsSearchPage() {
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
						new Array(30).fill(<ProductCard />)
					}
				</ul>
			</div>
		</section>
	)
}

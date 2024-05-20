'use client'
import ProductCard from "./products/ProductCard/ProductCard"
import styles from '@/styles/Home.module.css'

export default function Home({ products }) {
	return (
		<div>
			<div className={styles.mainBanner}></div>
			<ul className={styles.productList}>
				{
					products && products.map((product, index) => (
						<ProductCard product={product} />
					))
				}
			</ul>
		</div>
	)
}
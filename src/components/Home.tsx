'use client'
import SimpleImageSlider from "react-simple-image-slider";
import ProductCard from "./products/ProductCard/ProductCard"
import styles from '@/styles/Home.module.css'

export default function Home({ products }) {
	return (
		<div>
			<div className={styles.mainBanner}>
				<SimpleImageSlider
					width={1420}
					height={350}
					images={[
						'https://media.bunjang.co.kr/images/nocrop/1148830136_w1197.jpg',
						'https://media.bunjang.co.kr/images/nocrop/1152345381_w1197.jpg',
						'https://media.bunjang.co.kr/images/nocrop/1153718556_w1197.jpg',
						'https://media.bunjang.co.kr/images/nocrop/1153266147_w1197.jpg',
					]}
					autoPlay={true}
					showBullets={false}
					showNavs={true}
				/>
			</div>
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
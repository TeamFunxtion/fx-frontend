'use client'
import SimpleImageSlider from "react-simple-image-slider";
import ProductCard from "./products/ProductCard/ProductCard"
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function Home() {
	const [list, setList] = useState([]);

	const getProductList = async () => {
		const result = await api.get(`/products?size=1000`);
		const { data: { content } } = result;
		setList(content);
	}

	useEffect(() => {
		getProductList();
	}, []);

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
					list && list.map((product, index) => (
						<ProductCard product={product} key={index} />
					))
				}
			</ul>
		</div>
	)
}
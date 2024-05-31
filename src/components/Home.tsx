'use client'
import SimpleImageSlider from "react-simple-image-slider";
import ProductCard from "./products/ProductCard/ProductCard"
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useInView } from "react-intersection-observer";

export default function Home() {
	const [list, setList] = useState([]);
	const [ref, inView] = useInView();
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	const getProductList = async (pageNo) => {
		const result = await api.get(`/products?page=${pageNo || page}&size=30&sort=createDate`);
		const { data: { content, last } } = result;
		setList(list => [...list, ...content]);
		setHasMore(!last);
	}

	useEffect(() => {
		console.log('inview!');
		if (inView && hasMore) {
			setPage(prevPage => prevPage + 1);
			getProductList(page + 1);
		}
	}, [inView]);

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
			{
				hasMore && <div ref={ref} style={{ textAlign: 'center' }}>상품을 불러오는 중...</div>
			}
		</div>
	)
}
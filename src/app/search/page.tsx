"use client"
import ProductCard from "@/components/products/ProductCard/ProductCard";
import styles from "./page.module.css";
import ProductSearchFilter from "@/components/search/ProductSearchFilter";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useRouter } from "next/navigation";
import { getCategoryNameKR } from "@/utils/product";
import FxPagination from "@/components/FxPagination";
import NoResult from "@/components/NoResult";

export default function ProductsSearchPage() {
	const searchParams = useSearchParams();
	const [list, setList] = useState([]);
	const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
	const [pageInfo, setPageInfo] = useState({
		totalPages: 1,
		totalElements: 1,
	});
	const router = useRouter();
	const keyword = searchParams.get("keyword");
	const category = searchParams.get("category");
	const [sort, setSort] = useState('id');

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/search?keyword=${searchParams.get("keyword") || ''}&page=${value}`)
		// getList(value);
	};

	const getList = async (pageNo) => {

		const result = await api.get("/products", {
			params: {
				page: pageNo || 1,
				keyword,
				category,
				sort,
			}
		});
		setList(result.data.content);
		setPageInfo({
			totalPages: result.data.totalPages,
			totalElements: result.data.totalElements,
		})
	}

	useEffect(() => {
		getList(currentPage);
	}, [])

	useEffect(() => {
		if (!searchParams.get("page")) {
			setCurrentPage(1);
			getList(1);
		} else {
			getList(currentPage);
		}

	}, [searchParams])

	useEffect(() => {
		setCurrentPage(1);
		getList(1);
	}, [sort])

	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2>
					{category && <span style={{ color: 'dodgerblue' }}>'{getCategoryNameKR(category)}'&nbsp;&nbsp;</span>}
					{keyword && <span style={{ color: 'dodgerblue' }}>'{keyword}'&nbsp;&nbsp;</span>}
					검색 결과 <span style={{ color: 'grey' }}>{pageInfo.totalElements}개</span></h2>
				{/* <ProductSearchFilter /> */}
			</div>
			<div className={styles.main}>
				<div>
					<ul className={styles.sortBar}>
						<li className={sort === 'id' ? 'active' : ''} onClick={() => setSort('id')}>최신순</li>
						<li className={sort === 'views' ? 'active' : ''} onClick={() => setSort('views')}>조회수순</li>
						<li className={sort === 'price_asc' ? 'active' : ''} onClick={() => setSort('price_asc')}>낮은가격순</li>
						<li className={sort === 'price_desc' ? 'active' : ''} onClick={() => setSort('price_desc')}>높은가격순</li>
					</ul>
				</div>

				<ul className={styles.productList}>
					{
						list.map((item, index) => (
							<ProductCard key={index} product={item} />
						))
					}
				</ul>

				{
					list.length == 0 ? <NoResult /> : <FxPagination
						count={pageInfo.totalPages}
						page={currentPage}
						onChange={handleChange}
					/>
				}

			</div>
		</section>
	)
}

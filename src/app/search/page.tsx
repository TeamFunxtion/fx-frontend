"use client"
import ProductCard from "@/components/products/ProductCard/ProductCard";
import styles from "./page.module.css";
import ProductSearchFilter from "@/components/search/ProductSearchFilter";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsSearchPage() {
	const searchParams = useSearchParams();
	const [list, setList] = useState([]);
	const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
	const [pageInfo, setPageInfo] = useState({
		totalPages: 1,
		totalElements: 1,
	});
	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/search?keyword=${searchParams.get("keyword") || ''}&page=${value}`)
		// getList(value);
	};

	const getList = async (pageNo) => {
		const result = await api.get("/products", {
			params: {
				page: pageNo || 1,
				keyword: searchParams.get("keyword") || "",
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

	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2>상품 검색 결과 <span>({pageInfo.totalElements})</span></h2>
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
						list.map((item, index) => (
							<ProductCard key={index} product={item} />
						))
					}
				</ul>

				{
					list.length == 0 && <div className={styles.noResult}>
						😝 조회된 결과가 없습니다.
					</div>
				}

				{
					list.length > 0 && <div className={styles.paginationBar}>
						<Pagination
							count={pageInfo.totalPages}
							page={currentPage}
							onChange={handleChange}
							showFirstButton={true}
							showLastButton={true}
							size='large'
						/>
					</div>
				}
			</div>
		</section>
	)
}

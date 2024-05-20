'use client'
import FxTab from "@/components/FxTab"
import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react"
import api from "@/utils/api"
import { useRecoilValue } from "recoil"
import { userInfoState } from "@/store/atoms"
import ProductCard from "@/components/products/ProductCard/ProductCard"
import FxPagination from "@/components/FxPagination"
import NoResult from "@/components/NoResult"
import { productStatusTypes } from "@/app/constants"

export default function MyProductsPage({ }) {

	const [list, setList] = useState([]);
	const user = useRecoilValue(userInfoState);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(1);
	const statusTypeId = useRef('ST01');
	const [sort, setSort] = useState('id');

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		getList(value);
	};

	const getList = async (page) => {
		const result = await api.get('/products/my', {
			params: {
				userId: user.id,
				status: statusTypeId.current || 'ST01',
				sort: sort || 'id',
				page: page || currentPage || 1,
			}
		})
		const { data: { content, totalPages, totalElements } } = result;
		setList(content);
		setTotalElements(totalElements);
		setTotalPages(totalPages);
	}

	useEffect(() => {
		getList(1);
	}, [])

	useEffect(() => {
		getList(1)
	}, [sort])

	const onClickTab = (index) => {
		statusTypeId.current = productStatusTypes[index].value;
		getList(1);
	}

	return (
		<div className={styles.container}>
			<FxTab items={productStatusTypes} onClick={onClickTab} />
			<div className={styles.main}>
				<div className={styles.header}>
					<p className={styles.totalCount}>총 {totalElements}개</p>
					<ul className={styles.sort}>
						<li className={`${sort === 'id' ? 'active' : ''}`} onClick={() => setSort('id')}>최신순</li>
						<li className={`${sort === 'views' ? 'active' : ''}`} onClick={() => setSort('views')}>조회수순</li>
						<li className={`${sort === 'price_asc' ? 'active' : ''}`} onClick={() => setSort('price_asc')}>낮은가격순</li>
						<li className={`${sort === 'price_desc' ? 'active' : ''}`} onClick={() => setSort('price_desc')}>높은가격순</li>
					</ul>
				</div>
				<ul className={styles.ul}>
					{
						list && list.map((product, idx) => (
							<ProductCard product={product} />
						))
					}
				</ul>
				{
					list.length == 0 ? <NoResult /> : <FxPagination
						count={totalPages}
						page={currentPage}
						onChange={handleChange}
					/>
				}
			</div>
		</div>
	)
}
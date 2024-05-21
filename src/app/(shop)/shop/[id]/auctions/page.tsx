'use client'
import React, { useState, useEffect, useRef } from 'react';
import api from '@/utils/api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/atoms';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import FxPagination from '@/components/FxPagination';
import NoResult from '@/components/NoResult';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'; // Assuming you have a CSS module for styling

export default function Auctions() {
	const [list, setList] = useState([]);
	const user = useRecoilValue(userInfoState);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(1);
	const statusTypeId = useRef('ST01');
	const [sort, setSort] = useState('id');

	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		getList(value);
	};

	const getList = async (page) => {
		try {
			console.log(user);


			const result = await api.get('/products/my/auction', {
				params: {
					userId: user.id, // userId 추가
					status: statusTypeId.current || 'ST01',
					sort: sort || 'id',
					page: page || currentPage || 1,
					salesTypeId: 'AUCTION'
				},
			});
			const { data: { content, totalPages, totalElements } } = result;
			setList(content);
			setTotalElements(totalElements);
			setTotalPages(totalPages);
		} catch (error) {
			console.error("Error fetching auction products:", error); // 오류 처리
		}
	};

	useEffect(() => {
		getList(1);
	}, []);

	useEffect(() => {
		getList(1);
	}, [sort]);

	return (
		<div className={styles.container}>
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
					{list && list.map((product) => (
						<div key={product.id}>
							<ProductCard product={product} hideDeleted={true} />
						</div>
					))}
				</ul>
				{list.length === 0 ? <NoResult /> : (
					<FxPagination
						count={totalPages}
						page={currentPage}
						onChange={handleChange}
					/>
				)}
			</div>
		</div>
	);
}
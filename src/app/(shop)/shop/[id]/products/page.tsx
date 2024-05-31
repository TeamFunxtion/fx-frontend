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
import { BsGearFill, BsXLg } from "react-icons/bs"
import _ from "lodash";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function MyProductsPage({ guest, storeId }: { guest: boolean, storeId: string }) {

	const [list, setList] = useState([]);
	const user = useRecoilValue(userInfoState);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(1);
	const statusTypeId = useRef('ST01');
	const [sort, setSort] = useState('createDate');

	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		getList(value);
	};

	const getList = async (page) => {
		const result = await api.get('/products/my', {
			params: {
				userId: !guest ? user.id : storeId,
				status: statusTypeId.current || 'ST01',
				sort: sort || 'createDate',
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

	const handleClickSetting = (index) => {
		let newList = [..._.map(list, (p, idx) => {
			return {
				...p,
				showPopup1: index === idx ? !p.showPopup1 : false,
				showPopup2: false,
			}
		})];
		setList(newList);
	}

	const handleClickChangeStatus = (index) => {
		let newList = [..._.map(list, (p, idx) => {
			return { ...p, showPopup2: index === idx ? !p.showPopup2 : false }
		})];
		setList(newList);
	}

	const changeStatus = async (productId, statusType) => {
		const result = await api.patch("/products/status", {
			productId,
			statusTypeId: statusType,
		});
		const { data: { resultCode, msg } } = result;

		if (resultCode === '200') {
			toast.success(msg || "상태가 변경되었습니다!");
			getList(currentPage);
		} else {
			toast.error(msg || "상태변경을 실패했습니다!");
		}
	}

	return (
		<div className={styles.container}>
			{!guest &&
				<FxTab items={productStatusTypes} onClick={onClickTab} />
			}
			<div className={styles.main}>
				<div className={styles.header}>
					<p className={styles.totalCount}>총 {totalElements}개</p>
					<ul className={styles.sort}>
						<li className={`${sort === 'createDate' ? 'active' : ''}`} onClick={() => setSort('createDate')}>최신순</li>
						<li className={`${sort === 'views' ? 'active' : ''}`} onClick={() => setSort('views')}>조회수순</li>
						<li className={`${sort === 'price_asc' ? 'active' : ''}`} onClick={() => setSort('price_asc')}>낮은가격순</li>
						<li className={`${sort === 'price_desc' ? 'active' : ''}`} onClick={() => setSort('price_desc')}>높은가격순</li>
					</ul>
				</div>
				<ul className={styles.ul}>
					{
						list && list.map((product, idx) => (
							<div>
								<ProductCard product={product} hideDeleted={true} />
								{
									!guest && <>
										<div className={styles.settingBtn} onClick={() => handleClickSetting(idx)}>
											{
												product.showPopup1 ? <BsXLg /> : <BsGearFill />
											}
										</div>
										{
											product.showPopup1 && <ul className={styles.settingPopup}>
												<li onClick={() => router.push(`/products/${product.id}/edit`)}>상품수정</li>
												<li onClick={() => handleClickChangeStatus(idx)}>상태변경</li>
												<li onClick={() => changeStatus(product.id, 'ST05')}>상품삭제</li>
											</ul>
										}
										{
											product.showPopup2 && <ul className={styles.settingPopup}>
												<li onClick={() => changeStatus(product.id, 'ST01')}>판매중</li>
												<li onClick={() => changeStatus(product.id, 'ST02')}>판매완료</li>
												<li onClick={() => handleClickChangeStatus(idx)}>취소</li>
											</ul>
										}
									</>
								}

							</div>
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
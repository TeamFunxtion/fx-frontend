'use client'
import styles from "./page.module.css"
import { useEffect, useState } from "react"
import api from "@/utils/api"
import { useRecoilValue } from "recoil"
import { userInfoState } from "@/store/atoms"
import ProductCard from "@/components/products/ProductCard/ProductCard"
import FxPagination from "@/components/FxPagination"
import NoResult from "@/components/NoResult"
import { IoIosHeart } from "react-icons/io";


export default function Favorites({ }) {

	const [list, setList] = useState([]);
	const user = useRecoilValue(userInfoState);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(1);


	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		getList(value);
	};

	const getList = async (page) => {
		const result = await api.get('/favorites', {
			params: {
				userId: user.id,
				sort: 'createDate',
				page: page || currentPage || 1,
			}
		})
		const { data: { content, totalPages, totalElements } } = result;

		// liked 요소 추가해서 list에 담아주기(관심상품 하트 표시 상태 체크 위해서)
		const contentWithLike = content.map(item => ({
			...item,
			liked: true
		}));

		setList(contentWithLike);
		setTotalElements(totalElements);
		setTotalPages(totalPages);
	}

	useEffect(() => {
		getList(1);
	}, [])

	const updateFavorites = async (userId, productId, index) => {
		const res = await api.post(`/favorites`, { userId: userId, productId: productId });
		const { data: { resultCode, msg } } = res;
		if (resultCode === '200') {
			const newList = [...list];
			newList[index].liked = !newList[index].liked;
			setList(newList);
		}
	}




	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.header}>
					<h3 className={styles.title}>관심 상품 &nbsp;&nbsp;&nbsp;<span className={styles.totalCount}>총 {totalElements}개</span></h3>
				</div>
				<ul className={styles.ul}>
					{
						list && list.map((product, idx) => (
							<div key={idx}>

								<ProductCard product={product.product} />
								{product.liked ?
									<div className={styles.settingLike} onClick={() => { setTotalElements(totalElements - 1); updateFavorites(product.userId, product.product.id, idx); }}>
										<IoIosHeart />
									</div> :
									<div className={styles.settingUnLike} onClick={() => { setTotalElements(totalElements + 1); updateFavorites(product.userId, product.product.id, idx); }}>
										<IoIosHeart />
									</div>}

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
			</div >
		</div >
	)
}

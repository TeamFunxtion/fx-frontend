'use client'

import useUserInfo from "@/hooks/useUserInfo";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './page.module.css'
import NoResult from "@/components/NoResult";
import { dateFormatterYYYYMMDD } from "@/utils/common";
import { StyledRating, StyledRatingDisabled } from "@/components/StyledRating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function MyReviewsPage({ guest, storeId }: { guest: boolean, storeId: string }) {

	const [list, setList] = useState([]);
	const { user } = useUserInfo();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(1);
	const [last, setLast] = useState(false);
	const router = useRouter();

	const getList = async (page) => {

		const result = await api.get('/reviews', {
			params: {
				sellerId: !guest ? user.id : storeId,
				pageNo: page || currentPage || 1,
				size: 2,
			}
		})
		const { data: { resultCode, msg, data: { content, last, totalPages, totalElements } } } = result;
		setList([
			...list,
			...content
		]);
		setTotalElements(totalElements);
		setTotalPages(totalPages);
		setLast(last);
	}

	useEffect(() => {
		getList(1);
	}, [])


	const onClickNewList = () => {
		getList(currentPage + 1);
		setCurrentPage(currentPage + 1);
	}

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.header}>
					<p className={styles.totalCount}>총 {totalElements}개</p>
				</div>
				<ul className={styles.ul}>
					{
						list && list.map((review, idx) => (
							<li className={styles.reviewItem} onClick={() => router.push(`/products/${review.productId}`)}>
								<div className={styles.buyerProfileImgContainer}>
									<img className={styles.buyerProfileImg} src={review.buyerProfileImage} alt="" />
								</div>
								<div>
									<div className={styles.buyerNameAndDate}>
										<div>
											<h1 className={styles.buyerName}>{review.buyerName}</h1>
											<div className={styles.rating}>
												<StyledRatingDisabled
													name="customized-color"
													defaultValue={review.rating}
													disabled
													icon={<FavoriteIcon fontSize="inherit" />}
													emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
													style={{ opacity: 1 }}
												/>
											</div>
										</div>
										<div>{dateFormatterYYYYMMDD(review.createDate)}</div>
									</div>
									<div>
										<span className={styles.productTitle}>{review.productTitle}</span>
									</div>
									<div>
										{review.content}
									</div>
								</div>
							</li>
						))
					}
				</ul>
				{
					list.length == 0 && <NoResult />
				}
				{
					!last && <div className={styles.moreBtn}>
						<button onClick={onClickNewList}>더 보기</button>
					</div>
				}
			</div>
		</div>
	)
}
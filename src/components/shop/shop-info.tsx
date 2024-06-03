'use client'
import Link from "next/link";
import styles from "./shop-info.module.css";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import useUserInfo from "@/hooks/useUserInfo";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ShopInfo({ params }) {
	const { user } = useUserInfo();
	const isGuest = params.id != user.id;
	const baseUrl = `/shop/${user.id}`;
	const [userInfo, setUserInfo] = useState({
	});
	const [reviewScore, setReviewScore] = useState(0.0);


	const getShopUserDetail = async () => {
		const result = await api.get(`/members?id=${params.id}`);

		const { data: { resultCode, msg, data } } = result;
		if (resultCode === '200') {
			console.log(data);
			setUserInfo(data);
		}
	}


	useEffect(() => {
		getShopUserDetail();
	}, [user])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<img src={userInfo.profileImageUrl} />
					<h1 className={styles.user}>
						{userInfo.nickname || userInfo.email}
						<div className={styles.reviews}>
							<FavoriteIcon className={styles.heartIcon} />
							<span className={styles.reviewScore}>{userInfo.reviewCount > 0 ? userInfo.reviewScore : "0.0"}({userInfo.reviewCount})</span>
						</div>
					</h1>
					{!isGuest && <Link href={`${baseUrl}/profile`}>내 정보 변경</Link>}

				</div>
				{/* <div className={styles.headerRight}>
					
				</div> */}
			</div>
			<div className={styles.introContainer}>
				{userInfo.intro || `${userInfo.nickname || userInfo.email}님의 상점에 오신것을 환영합니다.`}
			</div>
		</div>
	)
}
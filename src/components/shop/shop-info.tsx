'use client'
import Link from "next/link";
import styles from "./shop-info.module.css";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function ShopInfo({ params }) {
	const user = useRecoilValue(userInfoState);
	const isGuest = params.id != user.id;
	const baseUrl = `/shop/${user.id}`;

	const [userInfo, setUserInfo] = useState({
	});


	const getUserDetail = async () => {
		const result = await api.get(`/members/${params.id}`);

		const { data: { resultCode, msg, data } } = result;
		if (resultCode === '200') {
			setUserInfo(data);
		}
	}

	useEffect(() => {
		getUserDetail();
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<img src={userInfo.profileImageUrl} />
					<h1>{userInfo.nickname || userInfo.email}</h1>
					{!isGuest && <Link href={`${baseUrl}/profile`}>내 정보 변경</Link>}
				</div>
				{/* <div className={styles.headerRight}>
					<div><Link href="/shop">상품 311</Link></div>
					<div><Link href="/shop/following">팔로잉 30</Link></div>
					<div><Link href="/shop/follower">팔로워 143</Link></div>
					<div><Link href="/shop">후기 1,300</Link></div>
				</div> */}
			</div>
			<div className={styles.introContainer}>
				{userInfo.intro || `${userInfo.nickname || userInfo.email}님의 상점에 오신것을 환영합니다.`}
			</div>
		</div>
	)
}
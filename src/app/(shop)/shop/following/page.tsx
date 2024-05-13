"use client"
import FollowCard from "@/components/shop/followCard";
import styles from "./page.module.css";
import { useState } from "react";
export default function Following() {
	const [followList, setFollowList] = useState([{
		image: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
		nickName: "연우사랑단건위",
		ratings: "★★★★☆",
		products: "상품0",
		follows: "팔로우0",
		isFollow: true
	}, {
		image: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
		nickName: "연우시러단건위",
		ratings: "★★★★★",
		products: "상품20",
		follows: "팔로우30",
		isFollow: false
	}]);
	return (
		<>
			<h3 className={styles.title}>팔로잉</h3>
			<div className={styles.follow}>
				팔로우 <span className={styles.followCount}>&nbsp;&nbsp;{followList.length}</span>
			</div>
			{followList.length == 0 ?
				<div>
					<div className={styles.followList}>아직 팔로우한 사람이 없습니다.</div>
				</div> :
				<div className={styles.grid}>
					{
						followList.map(function (item) {
							return (
								<FollowCard item={item} followList={followList} setFollowList={setFollowList} />
							)
						})
					}
				</div>}
		</>
	);
}
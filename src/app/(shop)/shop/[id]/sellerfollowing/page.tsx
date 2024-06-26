"use client"
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import FollowCard from "@/components/shop/followCard";
import { useInView } from "react-intersection-observer";


export default function SellerFollowing({ guest, storeId }: { guest: boolean, storeId: string }) {
	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;
	const [followList, setFollowList] = useState([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [ref, inView] = useInView();
	const [followCnt, setFollowCnt] = useState(0);
	const [initialLoad, setInitialLoad] = useState(true);

	const getFollowingList = async (page) => {

		const res = await api.get('/follow/sellerfollowing', {
			params: {
				userId: userId,
				storeId: storeId,
				page: page,
				size: 10
			}
		});
		const { data: { resultCode, data } } = res;
		if (resultCode === '200') {
			setFollowList(list => [...list, ...data.content]);
			setHasMore(data.content.length > 0);

		}
	};

	useEffect(() => {
		if (initialLoad) {
			getFollowingList(page);
			setInitialLoad(false);
		}
	}, [page, initialLoad]);

	useEffect(() => {
		if (inView && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	}, [inView, hasMore]);

	const changeFollowState = async (toId) => {
		const res = await api.post(`/follow/follower`, { toId: toId, fromId: userId })
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {

		}
	}
	const followState = (i) => {
		let newList = [...followList];
		newList[i].following = !newList[i].following;
		if (newList[i].following == true) {
			newList[i].followerCnt = newList[i].followerCnt + 1;
			setFollowCnt(followCnt + 1);
		} else {
			newList[i].followerCnt = newList[i].followerCnt - 1;
			setFollowCnt(followCnt - 1);
		}

		setFollowList(newList);
	}


	return (
		<>
			<h3 className={styles.title}>팔로잉</h3>
			<div className={styles.follow}>
				팔로잉 <span className={styles.followCount}>&nbsp;&nbsp;
					{followList.length > 0 ? followList.length : ""}
				</span>
			</div>
			{followList.length == 0 ?
				<div>
					<div className={styles.followList}>아직 팔로우한 사람이 없습니다.</div>
				</div> :
				<div className={styles.grid}>
					{followList.map((item, index) => (
						<FollowCard
							key={index}
							item={item}
							index={index}
							followState={followState}
							changeFollowState={changeFollowState}
							userId={userId}
						/>
					))}
					<div ref={ref}></div>
				</div>}
		</>
	);
}

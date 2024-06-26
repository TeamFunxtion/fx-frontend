"use client"
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import FollowCard from "@/components/shop/followCard";
import { useInView } from "react-intersection-observer";


export default function Follower() {
	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;
	const [followList, setFollowList] = useState([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [ref, inView] = useInView();
	const [initialLoad, setInitialLoad] = useState(true);

	const getFollowerList = async (page) => {

		const res = await api.get(`/follow/follower?userId=${userId}&page=${page}&size=10`);
		const { data: { resultCode, data } } = res;
		if (resultCode === '200') {
			setFollowList(list => [...list, ...data.content]);
			setHasMore(data.content.length > 0);

		}
	};

	useEffect(() => {
		if (initialLoad) {
			getFollowerList(page);
			setInitialLoad(false);
		}
	}, [page, initialLoad]);

	useEffect(() => {
		if (inView && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	}, [inView, hasMore]);

	const changeFollowState = async (toId) => {
		const res = await api.post(`/follow/follower`, { toId: toId, fromId: userId });
		const { data: { resultCode, msg } } = res;
		if (resultCode === '200') {

		}
	};

	const followState = (i) => {
		let newList = [...followList];
		newList[i].following = !newList[i].following;
		if (newList[i].following) {
			newList[i].followerCnt += 1;
		} else {
			newList[i].followerCnt -= 1;
		}
		setFollowList(newList);
	};


	return (
		<>
			<h3 className={styles.title}>팔로워</h3>
			<div className={styles.follow}>
				팔로워 <span className={styles.followCount}>&nbsp;&nbsp;{followList.length > 0 ? followList[0].followCnt : ""}</span>
			</div>
			{followList.length === 0 ?
				<div>
					<div className={styles.followList}>아직 이 상점을 팔로우한 사람이 없습니다.</div>
				</div> :
				<div className={styles.grid}>
					{followList.map((item, index) => (
						<FollowCard
							item={item}
							index={index}
							followState={followState}
							changeFollowState={changeFollowState}
						/>
					))}
					<div ref={ref}></div>
				</div>
			}
		</>
	);
}
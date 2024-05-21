"use client"
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import FollowCard from "@/components/shop/followCard";
import { useInView } from "react-intersection-observer";

export default function Following() {
	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;
	const [followList, setFollowList] = useState([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [ref, inView] = useInView();

	const getFollowingList = async (page) => {

		const res = await api.get(`/follow/following?userId=${userId}&page=${page}&size=10`)
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			setFollowList(list => [...list, ...data.content]);
			setHasMore(data.content.length > 0);
			toast.success(msg || `팔로잉 목록 조회 성공!`);
		}
	}

	useEffect(() => {
		getFollowingList(page);
	}, [page]);

	useEffect(() => {
		if (inView && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	}, [inView, hasMore]);

	const changeFollowState = async (toId) => {
		const res = await api.post(`/follow/follower`, { toId: toId, fromId: userId })
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || '팔로우 상태 변경 성공!');
		}
	}
	const followState = (i) => {
		let newList = [...followList];
		newList[i].following = !newList[i].following;
		if (newList[i].following == true) {
			newList[i].followerCnt = newList[i].followerCnt + 1;
		} else {
			newList[i].followerCnt = newList[i].followerCnt - 1;
		}

		setFollowList(newList);
	}

	return (
		<>
			<h3 className={styles.title}>팔로잉</h3>
			<div className={styles.follow}>
				팔로우 <span className={styles.followCount}>&nbsp;&nbsp;{followList.length > 0 ? followList[0].followCnt : ""}</span>
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
						/>
					))}
					<div ref={ref}></div>
				</div>}
		</>
	);
}
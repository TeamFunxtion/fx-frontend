"use client"
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import FollowCard from "@/components/shop/followCard";

export default function Follower() {
	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;
	const [followList, setFollowList] = useState([]);

	const getFollowerList = async () => {
		const res = await api.get(`/follow/follower?userId=${userId}`)
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {

			setFollowList(data);


		}
	}

	useEffect(() => {
		getFollowerList();
	}, []);

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
			<h3 className={styles.title}>팔로워</h3>
			<div className={styles.follow}>
				팔로워 <span className={styles.followCount}>&nbsp;&nbsp;{followList.length}</span>
			</div>
			{followList.length == 0 ?
				<div>
					<div className={styles.followList}>아직 이 상점을 팔로우한 사람이 없습니다.</div>
				</div> :
				<div className={styles.grid}>
					{
						followList.map(function (item, index) {
							return (
								<FollowCard item={item} index={index} followState={followState} changeFollowState={changeFollowState} />
							)
						})
					}
				</div>}
		</>
	);
}
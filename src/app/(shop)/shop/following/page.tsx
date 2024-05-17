"use client"
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";

export default function Following() {
	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;
	const [followList, setFollowList] = useState([]);

	const getFollowingList = async () => {

		const res = await api.get(`/follow/following?userId=${userId}`)
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			setFollowList(data);
			toast.success(msg || `팔로잉 목록 조회 성공!`);
		}
	}

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

	useEffect(() => {
		getFollowingList();
	}, []);


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
						followList.map(function (item, index) {
							return (
								<div key={index} className={styles.profiles}>
									<div className={styles.followProfile}>
										<img className={styles.profileImg} src={item.toMember.profileImageUrl} alt={item.toMember.nickname} />
										<div className={styles.nickName}>{item.toMember.nickname}</div>
										<div className={styles.rating}>★★★★★</div>
										<div>상품 {item.prCnt} | 팔로우 {item.followerCnt}</div>
										<button
											className={`${styles.btn} ${item.following == true ? styles.following : styles.follower}`}
											onClick={() => { followState(index); changeFollowState(item.toMember.id); }}
										>
											{item.following == true ? '팔로잉' : '팔로우'}
										</button>
									</div>
								</div>
							)
						})
					}
				</div>}
		</>
	);
}
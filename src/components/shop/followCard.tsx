import styles from './followCart.module.css';
import React from 'react';

export default function FollowCard({ item, followList, setFollowList }) {
	const followBtnToggle = () => {
		const updatedFollowList = followList.map(followItem => {
			if (followItem.nickName === item.nickName) {
				return { ...followItem, isFollow: !item.isFollow };
			}
			return followItem;
		});
		setFollowList(updatedFollowList);
	};

	return (
		<>
			<div className={styles.profiles}>
				<div className={styles.followProfile}>
					<img className={styles.profileImg} src={item.image} alt={item.nickName} />
					<div className={styles.nickName}>{item.nickName}</div>
					<div className={styles.rating}>{item.ratings}</div>
					<div>{item.products} | {item.follows}</div>
					<button
						className={`${styles.btn} ${item.isFollow ? styles.following : styles.follower}`}
						onClick={followBtnToggle}>
						{item.isFollow ? '팔로잉' : '팔로우'}
					</button>
				</div>
			</div>
		</>
	);
}

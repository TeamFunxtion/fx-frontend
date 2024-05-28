import styles from './followCard.module.css';
import React, { forwardRef } from 'react';

const FollowCard = forwardRef(({ item, index, followState, changeFollowState, userId, storeId }) => {
	console.log(item);
	console.log(userId);
	console.log(storeId);


	return (
		<div key={index} className={styles.profiles}>
			<div className={styles.followProfile}>
				{item.fromMember != null ?
					<>
						<img className={styles.profileImg} src={item.fromMember.profileImageUrl} alt={item.fromMember.nickname} />
						<div className={styles.nickName}>{item.fromMember.nickname}</div>
					</> :
					<>
						<img className={styles.profileImg} src={item.toMember.profileImageUrl} alt={item.toMember.nickname} />
						<div className={styles.nickName}>{item.toMember.nickname}</div>
					</>
				}
				<div className={styles.rating}>★★★★★</div>
				<div>상품 {item.productCnt} | 팔로우 {item.followerCnt}</div>
				{item.fromMember != null ?
					(item.fromMember.id !== userId ?
						<button
							className={`${styles.btn} ${item.following == true ? styles.following : styles.follower}`}
							onClick={() => { followState(index); changeFollowState(item.fromMember.id); }}
						>
							{item.following == true ? '팔로잉' : '팔로우'}
						</button> : ""
					)
					:
					(item.toMember.id !== userId ?
						<button
							className={`${styles.btn} ${item.following == true ? styles.following : styles.follower}`}
							onClick={() => { followState(index); changeFollowState(item.toMember.id); }}
						>
							{item.following == true ? '팔로잉' : '팔로우'}
						</button> : ""
					)
				}
			</div>
		</div>
	)
});

export default FollowCard;

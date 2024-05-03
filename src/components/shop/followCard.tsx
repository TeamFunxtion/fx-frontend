import styles from './followCart.module.css';

export default function FollowCard({ follow }) {
	return (
		<>
			<div className={styles.profiles}>
				<div className={styles.followProfile}>
					<img className={styles.profileImg} src={follow.image} />
					<div className={styles.nickName}>{follow.nickName}</div>
					<div className={styles.rating}>{follow.ratings}</div>
					<div>{follow.products} | {follow.follows}</div>
					{true
						?
						<button className={`${styles.btn} ${styles.following}`}>팔로잉</button>
						:
						<button className={`${styles.btn} ${styles.follower}`}>팔로우</button>}
				</div>
			</div>
		</>
	);
}
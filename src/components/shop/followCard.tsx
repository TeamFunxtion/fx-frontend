import styles from './followCard.module.css';
import React, { forwardRef, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { StyledRatingDisabled } from '../StyledRating';
import Link from 'next/link';

const FollowCard = forwardRef(({ item, index, followState, changeFollowState, userId, storeId }) => {

	console.log(item);
	return (
		<div key={index} className={styles.profiles}>
			<div className={styles.followProfile}>
				<Link href={item.fromMember != null ? (item.fromMember.id != userId ? `/shop/${item.fromMember.id}` : `/shop/${item.fromMember.id}/products`)
					: (item.toMember.id != userId ? `/shop/${item.toMember.id}` : `/shop/${item.toMember.id}/products`)}>
					<div>
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
						<div className={styles.rating}><StyledRatingDisabled
							name="customized-color"
							defaultValue={item.rating}
							disabled
							icon={<FavoriteIcon fontSize="inherit" />}
							emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
							style={{ opacity: 1 }}
						/></div>
						<div className={styles.count}>상품 {item.productCnt} | 팔로우 {item.followerCnt}</div>
					</div>
				</Link>
				{userId == 0 ? ""
					:
					(item.fromMember != null ?
						(item.fromMember.id !== userId ?
							<button
								className={`${styles.btn} ${item.following == true ? styles.following : styles.follower}`}
								onClick={() => { followState(index); changeFollowState(item.fromMember.id); }}
							>
								{item.following == true ? '팔로잉' : '팔로우'}
							</button> :
							<button
								className={`${styles.btn} ${styles.followNo}`}
								onClick={() => { followState(index); changeFollowState(item.fromMember.id); }}
								disabled
							>
								{'팔로잉 불가'}
							</button>
						)
						:
						(item.toMember.id !== userId ?
							<button
								className={`${styles.btn} ${item.following == true ? styles.following : styles.follower}`}
								onClick={() => { followState(index); changeFollowState(item.toMember.id); }}
							>
								{item.following == true ? '팔로잉' : '팔로우'}
							</button> :
							<button
								className={`${styles.btn} ${styles.followNo}`}
								onClick={() => { followState(index); changeFollowState(item.toMember.id); }}
								disabled
							>
								{'팔로잉 불가'}
							</button>
						)
					)}
			</div>
		</div>
	)
});

export default FollowCard;

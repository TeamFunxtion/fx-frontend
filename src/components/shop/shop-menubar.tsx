import Link from "next/link"
import styles from "./shop-menubar.module.css"

export default function ShopMenubar() {
	return (
		<div className={styles.container}>
			<h1 className={styles.pageTitle}>마이페이지</h1>
			<ul className={styles.listContainer}>
				<h3 className={styles.listTitle}>거래 정보</h3>
				<li><Link href="/shop">내 상품</Link></li>
				<li><Link href="/shop">진행중 경매</Link></li>
				<li><Link href="/shop">참여중 경매</Link></li>
				<li><Link href="/shop">판매 내역</Link></li>
				<li><Link href="/shop">구매 내역</Link></li>
			</ul>

			<ul className={styles.listContainer}>
				<h3 className={styles.listTitle}>내 정보</h3>
				<li><Link href="/shop/update">회원정보 수정</Link></li>
				<li><Link href="/shop">관심 상품</Link></li>
				<li><Link href="/shop/following">팔로잉</Link></li>
				<li><Link href="/shop/follower">팔로워</Link></li>
				<li><Link href="/shop">문의 내역</Link></li>
			</ul>

			<ul className={styles.listContainer}>
				<h3 className={styles.listTitle}>결제 정보</h3>
				<li><Link href="/shop/payments">결제 내역</Link></li>
			</ul>
		</div>
	)
}
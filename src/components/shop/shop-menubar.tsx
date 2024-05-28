'use client'
import Link from "next/link"
import styles from "./shop-menubar.module.css"
import { useRecoilValue } from "recoil"
import { userInfoState } from "@/store/atoms"
import { usePathname } from "next/navigation"

export default function ShopMenubar({ params }) {
	const user = useRecoilValue(userInfoState);
	const baseUrl = `/shop/${user.id}`;
	const pathname = usePathname();
	// console.log(pathname);
	// console.log(params)
	const isGuest = params.id != user.id;

	return (
		<>
			{
				!isGuest && <div className={styles.container}>
					<h1 className={styles.pageTitle}>마이페이지</h1>
					<ul className={styles.listContainer}>
						<h3 className={styles.listTitle}>거래 정보</h3>
						<li className={`${pathname.indexOf('/products') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/products`}>내 상품</Link></li>
						<li className={`${pathname.indexOf('/auctions') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/auctions`}>진행중 경매</Link></li>
						<li className={`${pathname.indexOf('/bids') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/bids`}>참여중 경매</Link></li>
						<li className={`${pathname.indexOf('/sell') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/sell`}>판매 내역</Link></li>
						<li className={`${pathname.indexOf('/buy') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/buy`}>구매 내역</Link></li>
						<li className={`${pathname.indexOf('/reviews') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/reviews`}>상점 후기</Link></li>
					</ul>

					<ul className={styles.listContainer}>
						<h3 className={styles.listTitle}>내 정보</h3>
						<li className={`${pathname.indexOf('/profile') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/profile`}>회원정보 수정</Link></li>
						<li className={`${pathname.indexOf('/favorites') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/favorites`}>관심 상품</Link></li>
						<li className={`${pathname.indexOf('/following') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/following`}>팔로잉</Link></li>
						<li className={`${pathname.indexOf('/follower') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/follower`}>팔로워</Link></li>
						<li><Link href="/qna">문의 내역</Link></li>
					</ul>

					<ul className={styles.listContainer}>
						<h3 className={styles.listTitle}>결제 정보</h3>
						<li className={`${pathname.indexOf('/payments') > -1 ? 'active' : ''}`}><Link href={`${baseUrl}/payments`}>결제 내역</Link></li>
					</ul>
				</div >
			}
		</>
	)
}
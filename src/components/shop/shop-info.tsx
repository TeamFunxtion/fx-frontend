import Link from "next/link";
import styles from "./shop-info.module.css";

export default function ShopInfo() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<img src="https://t4.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4spH/image/SNUBz0Yndn0xmm5BTetNGApjoSY" />
					<h1>인천불주먹류연우</h1>
					<Link href="shop">내 정보 변경</Link>
				</div>
				<div className={styles.headerRight}>
					<div><Link href="/shop">상품 311</Link></div>
					<div><Link href="/shop/following">팔로잉 30</Link></div>
					<div><Link href="/shop/follower">팔로워 143</Link></div>
					<div><Link href="/shop">후기 1,300</Link></div>
				</div>
			</div>
			<div className={styles.introContainer}>
				안녕하세요.저는 류연우입니다.안녕하세요.저는 류연우입니다.안녕하세요.저는 류연우입니다.안녕하세요.저는 류연우입니다.
				안녕하세요.저는 류연우입니다.안녕하세요.저는 류연우입니다.안녕하세요.저는 류연우입니다.안녕하세요.저는 류연우입니다.
			</div>
		</div>
	)
}
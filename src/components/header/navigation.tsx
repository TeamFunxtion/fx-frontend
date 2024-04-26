import { BsAlarm, BsBagHeart, BsEmojiSmile, BsList } from "react-icons/bs";
import styles from "./navigation.module.css";
import Link from "next/link";

export default function Navigation() {
	return (
		<nav className={styles.navigation}>
			<div className={styles.left}>
				<div className={styles.allCategory}>
					<BsList />
				</div>
				<ul className={styles.list}>
					<li className={styles.allCategory}>
						<Link href="/search">경매 둘러보기</Link>
					</li>
					<li className={styles.allCategory}>
						<Link href="/search">상품 둘러보기</Link>
					</li>
					<li className={styles.allCategory}>
						<Link href="/search">무료나눔</Link>
					</li>
				</ul>
			</div>
			<ul className={styles.right}>
				<li><Link href="/auth/login">로그인</Link></li>
				<li><Link href="/auth/signup">회원가입</Link></li>
			</ul>
		</nav>
	)
}
import HeaderTop from "./header-top";
import Navigation from "./navigation";
import styles from "./header.module.css";
import { BsSearch, BsBell, BsBagPlus, BsChatDots, BsPerson } from "react-icons/bs";
import Link from "next/link";

export default function Header() {
	return (
		<header className={styles.header}>
			{/* <HeaderTop /> */}
			<HeaderMain />
			<Navigation />
		</header>
	)
}

function HeaderMain() {
	return (
		<div className={styles.headerMain}>
			<div className={styles.mainLeft}>
				<Link href="/"><img src="/logo.png" /></Link>
				<div className={styles.inputContainer}>
					<BsSearch />
					<input className={styles.searchInput} type="text" placeholder="어떤 상품을 찾고 계시나요?" maxLength={30} />
				</div>
			</div>
			<div className={styles.mainRight}>
				<div className={styles.iconContainer}>
					<Link href="/notify">
						<BsBell />
						<span>알림</span>
					</Link>
				</div>
				<div className={styles.iconContainer}>
					<Link href="/products/new">
						<BsBagPlus />
						<span>판매하기</span>
					</Link>
				</div>
				<div className={styles.iconContainer}>
					<Link href="/chats">
						<BsChatDots />
						<span>채팅</span>
					</Link>
				</div>
				<div className={styles.iconContainer}>
					<Link href="/shop">
						<BsPerson />
						<span>마이</span>
					</Link>
				</div>
			</div>
		</div>
	)
}


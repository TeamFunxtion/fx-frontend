"use client"
import Navigation from "./navigation";
import styles from "./header.module.css";
import { BsSearch, BsBell, BsBagPlus, BsChatDots, BsPerson, BsCurrencyDollar } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderTop from "./header-top";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";

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
	const [keyword, setKeyword] = useState("");
	const router = useRouter();
	const user = useRecoilValue(userInfoState);

	const onKeyEnter = (e) => {
		if (e.key === 'Enter') {
			router.push(`/search?keyword=${keyword}&page=1`);
		}
	}

	const onChangeKeyword = (e) => {
		setKeyword(e.target.value);
	}

	const onClickLink = (path) => {
		if (!user.id) {
			router.push("/auth/login");
		} else {
			router.push(path);
		}
	}

	return (
		<div className={styles.headerMain}>
			<div className={styles.mainLeft}>
				<Link href="/"><img src="/logo.png" /></Link>
				<div className={styles.inputContainer}>
					<BsSearch />
					<input className={styles.searchInput}
						type="text"
						placeholder="어떤 상품을 찾고 계시나요?"
						onKeyDown={onKeyEnter}
						onChange={onChangeKeyword}
						maxLength={30} />
				</div>
			</div>
			<div className={styles.mainRight}>
				<div className={styles.iconContainer} onClick={() => onClickLink('/notify')}>
					<Link href="">
						<BsBell />
						<span>알림</span>
					</Link>
				</div>
				<div className={styles.iconContainer} onClick={() => onClickLink('/products/new')}>
					<Link href="">
						<BsBagPlus />
						<span>판매하기</span>
					</Link>
				</div>
				<div className={styles.iconContainer} onClick={() => onClickLink('/chats')}>
					<Link href="">
						<BsChatDots />
						<span>채팅</span>
					</Link>
				</div>
				<div className={styles.iconContainer} onClick={() => onClickLink(`/shop/${user.id}/products`)}>
					<Link href="">
						<BsPerson />
						<span>마이</span>
					</Link>
				</div>
			</div>
		</div>
	)
}


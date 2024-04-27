'use client'

import { useState, useRef } from "react";
import { BsAlarm, BsBagHeart, BsEmojiSmile, BsList } from "react-icons/bs";
import styles from "./navigation.module.css";
import Link from "next/link";
import CategoryList from "./category-list";

export default function Navigation() {
	const [showCategoryList, setShowCategoryList] = useState(false);
	const timer: any = useRef(null);

	const handleShowCategory = (flag: boolean, isLazy: boolean) => {
		if (timer.current) clearTimeout(timer.current);
		if (!isLazy) {
			setShowCategoryList(flag);
		} else {
			if (!flag) {
				timer.current = setTimeout(() => {
					setShowCategoryList(flag);
				}, 1500);
			}
		}
	}

	return (
		<nav className={styles.navigation}>
			<div className={styles.left}>
				<div className={styles.categoryIcon} onMouseEnter={() => handleShowCategory(true, false)} onMouseLeave={() => handleShowCategory(false, true)}>
					<span className={showCategoryList ? 'active' : ''}><BsList /></span>
					<CategoryList showCategoryList={showCategoryList} handleShowCategory={handleShowCategory} />
				</div>
				<ul className={styles.list}>
					<li className={styles.tab}>
						<Link href="/search">경매 둘러보기</Link>
					</li>
					<li className={styles.tab}>
						<Link href="/search">상품 둘러보기</Link>
					</li>
					<li className={styles.tab}>
						<Link href="/search">무료나눔</Link>
					</li>
				</ul>
			</div>
			<ul className={styles.right}>
				<li><Link href="/auth/login">로그인</Link></li>
				<li><Link href="/auth/join">회원가입</Link></li>
			</ul>
		</nav>
	)
}
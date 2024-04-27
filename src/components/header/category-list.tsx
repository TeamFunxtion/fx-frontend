import Link from "next/link"
import styles from "./category-list.module.css"

export default function CategoryList({ showCategoryList, handleShowCategory }) {
	return (
		showCategoryList ? <ul className={styles.categoryList} onMouseLeave={() => handleShowCategory(false, false)}>
			<li><Link href="/">전체</Link></li>
			<li><Link href="/">카테고리</Link></li>
			<li><Link href="/">카테고리</Link></li>
			<li><Link href="/">카테고리</Link></li>
			<li><Link href="/">카테고리</Link></li>
			<li><Link href="/">카테고리</Link></li>
			<li><Link href="/">카테고리</Link></li>
			<li><Link href="/">카테고리</Link></li>
			<li><Link href="/">카테고리</Link></li>
		</ul> : <></>
	)
}
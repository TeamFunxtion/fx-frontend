import Link from "next/link"
import styles from "./category-list.module.css"
import { categories } from "@/app/constants"

export default function CategoryList({ showCategoryList, handleShowCategory }) {
	return (
		showCategoryList ? <ul className={styles.categoryList} onMouseLeave={() => handleShowCategory(false, false)}>
			{
				categories.map((category) => (
					<li><Link href={`/search?ca=${category.categoryId}`}>{category.categoryName}</Link></li>
				))
			}
		</ul> : <></>
	)
}
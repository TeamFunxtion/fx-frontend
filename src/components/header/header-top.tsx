import Link from "next/link"
import styles from "./header-top.module.css"

export default function HeaderTop() {
	return (
		<ul className={styles.container}>
			<li>
				<Link href="/">고객센터 &gt;</Link>
			</li>
		</ul>
	)
}
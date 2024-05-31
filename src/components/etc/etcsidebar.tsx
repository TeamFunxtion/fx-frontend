import Link from "next/link";
import styles from "./etcsidebar.module.css";
import { usePathname } from "next/navigation";

export default function Etcsidebar() {
	const pathname = usePathname();



	return (
		<aside className={styles.etcAside}>
			<h3 className={styles.etcNotice}>고객센터</h3>
			<br />
			<li className={pathname.indexOf('/notice') > -1 ? styles.etcAsideSerch : styles.etcAsideLi}><Link href="/notice" >공지사항</Link></li>
			<li className={pathname.indexOf('/faq') > -1 ? styles.etcAsideSerch : styles.etcAsideLi}><Link href="/faq" >자주 묻는 질문</Link></li>
			<li className={pathname.indexOf('/qna') > -1 ? styles.etcAsideSerch : styles.etcAsideLi}><Link href="/qna" >1:1문의</Link></li>
		</aside >
	)

}
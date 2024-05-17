import styles from "./etcsidebar.module.css";

export default function Etcsidebar() {

	return (
		<aside className={styles.etcAside}>
			<h3 className={styles.etcNotice}>고객센터</h3>
			<br />

			<li className={styles.etcAsideLi}><a href="/notice">공지사항</a></li>
			<li className={styles.etcAsideLi}><a href="/notice/faq">자주 묻는 질문</a></li>
			<li className={styles.etcAsideLi}><a href="/qna">1:1문의</a></li>
		</aside>
	)

}
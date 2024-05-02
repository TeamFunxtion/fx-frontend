import styles from "./page.module.css"

export default function Notice({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={styles.noticeMain}>
			<aside className={styles.noticeAside}>
				<h3 className={styles.noticeNotice}>고객센터</h3>
				<br />
				<li><a href="/">공지사항</a></li>
				<li><a href="/notice/">자주 묻는 질문</a></li>
				<li><a href="/notice/">1:1문의</a></li>
			</aside>

			<section className={styles.noticeSection}>
				<div className={styles.noticeDiv}>
					<div className={styles.noticeQ}>Q</div>
					<div className={styles.noticeContent}>GS 및 CU 편의점 택배 운임 변경</div>
					<div className={styles.noticeSysdate}>23.12.15</div>
				</div>
				<div className={styles.noticeDiv}>
					<div className={styles.noticeQ}>Q</div>
					<div className={styles.noticeContent}>GS 및 CU 편의점 택배 운임 변경</div>
					<div className={styles.noticeSysdate}>23.12.15</div>
				</div>
				<div className={styles.noticeDiv}>
					<div className={styles.noticeQ}>Q</div>
					<div className={styles.noticeContent}>GS 및 CU 편의점 택배 운임 변경</div>
					<div className={styles.noticeSysdate}>23.12.15</div>
				</div>
				<div>
					<ul className={styles.noticePage}>
						<li><a href="" className={styles.noticePageUpDown}>이전</a></li>
						<li><a href="" className={styles.noticePageNum}>1</a></li>
						<li><a href="" className={styles.noticePageNum}>2</a></li>
						<li><a href="" className={styles.noticePageNum}>3</a></li>
						<li><a href="" className={styles.noticePageUpDown}>다음</a></li>
					</ul>
				</div>
			</section>


		</div>


	);
}
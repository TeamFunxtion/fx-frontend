import styles from './page.module.css';
import api from '@/utils/api';


export default async function FAQPage() {
	// todo. 목록 조회
	const result = await api.get("/faqs");
	/*console.log(result);
	console.log("여긴?")
	console.log(result.data)*/
	const faqList = result.data;

	return (
		<div>
			<div className={styles.noticeMain}>
				<aside className={styles.noticeAside}>
					<h3 className={styles.noticeNotice}>고객센터</h3>
					<br />
					<li><a href="/">공지사항</a></li>
					<li><a href="/notice/faq">자주 묻는 질문</a></li>
					<li><a href="/notice/">1:1문의</a></li>
				</aside>

				<div className={styles.container}>
					<section className="info">
						{/* {question.map((val) => (
							//components에 props 넘겨준다.
							<SingleQuestion key={val.id} setIndex={setIndex} index={index} {...val} />
						))} */}
						{
							faqList.map((faq, index) => (
								<div className={styles.noticeDiv} key={index}>
									<div className={styles.noticeContent}>
										{faq.faqTitle}
										{faq.faqContent}
									</div>
								</div>
							))
						}
						<ul className={styles.noticePage}>
							<li><a href="" className={styles.noticePageUpDown}>이전</a></li>
							<li><a href="" className={styles.noticePageNum}>1</a></li>
							<li><a href="" className={styles.noticePageNum}>2</a></li>
							<li><a href="" className={styles.noticePageNum}>3</a></li>
							<li><a href="" className={styles.noticePageUpDown}>다음</a></li>
						</ul>
					</section>
				</div>
			</div>
		</div>


	);
}
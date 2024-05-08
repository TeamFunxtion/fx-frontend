"use client"
import styles from './page.module.css';
import React, { useState } from 'react';
import { data } from './data';
import SingleQuestion from './Question';


export default function App() {
	// 데이터 셋한걸 useState에 상태관리
	const [question, setQuestion] = useState<any[]>(data);

	//클릭한 id값 useState에 상태관리
	const [index, setIndex] = useState<number>(0);

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
						{question.map((val) => (
							//components에 props 넘겨준다.
							<SingleQuestion key={val.id} setIndex={setIndex} index={index} {...val} />
						))}
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
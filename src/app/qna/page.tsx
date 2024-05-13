import styles from "./page.module.css";
import React, { useState } from "react";
import api from "@/utils/api";


function QnaInquiryHistory() {

	return (
		<div>
			<div>개인정보</div>

		</div>
	);
}

export default function Qna() {

	const [value, setValue] = useState();


	const onclick = (id) => {
		if (id === 1) {
			styles.qnaInquiryHistory
		}

	}



	return (
		<div className={styles.qnaMain}>
			<aside className={styles.qnaAside}>
				<h3 className={styles.qnaNotice}>고객센터</h3>
				<br />

				<li><a href="/notice">공지사항</a></li>
				<li><a href="/">자주 묻는 질문</a></li>
				<li><a href="/qna">1:1문의</a></li>
			</aside>

			<div className={styles.qnaDiv}>
				<div className={styles.qnaInquiryHistory} onClick={() => onclick(1)}>문의/안내 내역</div>

				<div className={styles.qnaInquiry} onClick={() => onclick(2)}>문의하기</div>
			</div>
			<div>
				<QnaInquiryHistory></QnaInquiryHistory>
			</div>

		</div>
	)

}
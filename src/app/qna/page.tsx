"use client"
import styles from "./page.module.css";
import React, { useState } from "react";
import api from "@/utils/api";




export default function Qna() {

	const [qnaContent, setQnaContent] = useState(Number(1));
	const [Answer, setAnswer] = useState(Number(0));
	const qnaContentlist = (id) => {
		setQnaContent(id);

	}

	const qnaAnswerConten = (id) => {

		if (Answer === id) {
			setAnswer(0);
		} else {
			setAnswer(1);
		}
	}



	function QnaInquiryHistory() {

		return (
			<div>
				<div className={styles.qnaHistoryDiv} onClick={() => qnaAnswerConten(1)}>
					<div className={styles.qnaHistoryTag}>개인정보&회원계정{'>'}상품</div>
					<div className={styles.qnaHistoryContnt}>상품 등록이 안되요</div>
					<div className={styles.qnaHistortAnswer}>답변완료:2024-03-29</div>
				</div>
				{Answer === 1 &&
					<div className={styles.qnaHistoryDiv}>
						<div className={styles.qnaAnswer}>
							<div className={styles.qnaAnswerName}>작성자 : 류연우</div>
							<div className={styles.qnaAnsWerMail}>이메일 : ss521@naver.com</div>
						</div>
						<div className={styles.qnaAnswerContent}>내용: 일을 어떻게하는 겁니까 상품 등록이 안되잔아요 그러면서 수수료 때먹습니까</div>

						<div className={styles.qnaAnswerD}>
							<div className={styles.qnaAnswerAswer}>답변 </div>
							<div className={styles.qnaAswerAswerContent}>죄송합니다 고객님 확인후 바로 조치해 드리겠습니다.</div>
						</div>
					</div>

				}
			</div>
		);
	}

	function QnaInquiry() {
		return (
			<div >


				<div className={styles.qnaInquirtTop}>
					<div className={styles.qnaInquirtName}><div>*유형</div></div>
					<select name="" id="" className={styles.qnaInquirtCategory} >
						<option value=""> 카테고리 선택</option>
						<option value="">aa</option>
						<option value="">bb</option>
						<option value="">cc</option>
					</select>
				</div>

				<div className={styles.qnaInquirt}>
					<div className={styles.qnaInquirtName}><div>*제목</div></div>
					<input type="text" className={styles.qnaInquirtNameInput} placeholder="제목을 입력해 주세요" />
				</div>

				<div className={styles.qnaIpquirtContent} >
					<input type="text" className={styles.qnaIpquirtContentInput} placeholder="내용 입력" />
				</div>
				<div className={styles.qnaInquirtButton}>
					<button className={styles.qnaInquirtButtonInquirt}>문의하기</button>
					<button className={styles.qnaInquirtButtonMenu}>목록가기</button>
				</div>
			</div >
		)
	}



	return (

		<div className={styles.qnaMain}>
			<aside className={styles.qnaAside}>
				<h3 className={styles.qnaNotice}>고객센터</h3>
				<br />

				<li><a href="/notice">공지사항</a></li>
				<li><a href="/">자주 묻는 질문</a></li>
				<li	><a href="/qna">1:1문의</a></li>
			</aside>


			<section className={styles.qnaSection}>
				<div className={styles.qnaInquiryDiv}>
					<div className={qnaContent === 1 ? styles.qnaInquiryHistoryOn : styles.qnaInquiryHistoryOff} onClick={() => qnaContentlist(1)}>문의/안내 내역</div>
					<div className={qnaContent === 2 ? styles.qnaInquiryOn : styles.qnaInquiryOff} onClick={() => qnaContentlist(2)}>문의하기</div>
				</div>
				<br />
				<div className={styles.qnaContent}>
					{
						qnaContent === 1 ?
							<QnaInquiryHistory />
							: <QnaInquiry />
					}
				</div>
			</section >
		</div >

	)

}
"use client"
import styles from "./page.module.css";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Etcsidebar from "@/components/etc/etcsidebar";
import QnaInquiry from "./qnainquiry/qnainquiry"
import QnaInquiryHistory from "./qnainquiry/qnainquiryhistory";


export default function Qna() {


	const [qnaContentCh, setQnaContentCh] = useState(Number(1));
	const qnaContentlist = (id) => {
		setQnaContentCh(id);
	};



	return (


		<div className={styles.qnaMain}>
			<Etcsidebar />
			<section className={styles.qnaSection}>
				<div className={styles.qnaInquiryDiv}>


					<div className={qnaContentCh === 1 ? styles.qnaInquiryHistoryOn : styles.qnaInquiryHistoryOff} onClick={() => qnaContentlist(1)}>문의/안내 내역</div>


					<div className={qnaContentCh === 2 ? styles.qnaInquiryOn : styles.qnaInquiryOff} onClick={() => qnaContentlist(2)}>문의하기</div>
				</div>
				<br />
				<div className={styles.qnaContent}>
					{
						qnaContentCh === 1 ?
							<QnaInquiryHistory />
							: <QnaInquiry />
					}
				</div>
			</section >

		</div >

	)

}
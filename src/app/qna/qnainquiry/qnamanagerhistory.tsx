"use client"
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { userInfoState } from "@/store/atoms";
import { useRecoilValue } from "recoil";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from '@mui/material/Pagination';
import { dateFormatterYYYYMMDDHHmm } from "@/utils/common";
import { getQnaCategoryNameKR } from "@/utils/product";
import toast from "react-hot-toast";

export default function QnaInquiryHistory() {


	const [list, setList] = useState([]);
	const [currentPage, setCurrentPage] = useState(Number(1));
	const searchParams = useSearchParams();
	const [Answer, setAnswer] = useState("");
	const [answerChange, setAnswerChange] = useState('all');
	const [pageInfo, setPageInfo] = useState({
		totalPages: 1,
		totalElements: 1,
	});

	const router = useRouter();
	const [qnaManagerAnswer, setQnaManagerAnswer] = useState('');
	const [qnaAnswerId, setQnaAnswerId] = useState('');
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/qna?&page=${value}`)
	};

	const getList = async (pageNo) => {
		console.log(answerChange);
		const result = await api.get(`/qnas/manager`, {
			params: {
				page: pageNo || 1,
				ch: answerChange
			}
		}

		);
		setList(result.data.content);
		setPageInfo({
			totalPages: result.data.totalPages,
			totalElements: result.data.totalElements,
		})
	}


	useEffect(() => {
		getList(currentPage);
	}, [])

	useEffect(() => {
		getList(1);
	}, [answerChange])


	useEffect(() => {
		if (!searchParams.get("page")) {
			setCurrentPage(1);
			getList(1);
		} else {
			getList(currentPage);
		}

	}, [searchParams])



	useEffect(() => {
		if (list.id) {
			setQnaAnswerId(list.id);
		}

	}, [qnaAnswerId]);

	const insertAnswer = async (qnaId) => {

		if (qnaManagerAnswer.trim() === '') {
			toast.error("답변을 입력해 주세요")
		} else {
			const res = await api.patch(`/qnas`, { id: qnaId, qnaAnswer: qnaManagerAnswer });
			const { data: { resultCode, msg, data } } = res;
			if (resultCode == '200') {
				toast.success(msg || ` `);
				router.push("/qna?page=1")
			}
		}
	}


	const qnaAnswerContent = (id) => {
		if (Answer === id) {
			setAnswer("");

		} else {
			setAnswer(id);

		}
	}

	const answerCh = (id) => {
		setAnswerChange(id);

	}



	return (
		<div>
			<div>
				<ul className={styles.ch}>
					<li className={answerChange === 'all' ? styles.on : styles.off} onClick={() => answerCh('all')}>전체목록조회</li>
					<li className={answerChange === 'null' ? styles.on : styles.off} onClick={() => answerCh('null')}>미답변목록조회</li>
				</ul>
				<QnaInquiryHistoryBack list={list}
					qnaAnswerContent={qnaAnswerContent}
					setQnaManagerAnswer={setQnaManagerAnswer}
					insertAnswer={insertAnswer}
					Answer={Answer}
				/>
				<div>
					{
						<ul className={styles.qnaPage}>

							{

								list.length > 0 && <div className={styles.paginationBar}>
									<Pagination
										count={pageInfo.totalPages}
										page={currentPage}
										onChange={handleChange}
										showFirstButton={true}
										showLastButton={true}
										size='large'
									/>
								</div>
							}
						</ul>
					}</div>
			</div>
		</div >

	)
}

function QnaInquiryHistoryBack({ list, qnaAnswerContent, setQnaManagerAnswer, insertAnswer, Answer }) {
	return (


		list.length > 0 ? list.map(function (qna) {
			return (

				<div>


					<div className={styles.qnaHistoryDiv} onClick={() => qnaAnswerContent(qna.id)}>
						<div className={styles.qnaHistoryTag}>{getQnaCategoryNameKR(qna.categoryId)}</div>
						{qna.qnaAnswer === null ?
							<div className={styles.qnaHistorAnswerNot}>답변미등록</div> :
							<div className={styles.qnaHistorAnswerOk}>답변완료</div>
						}
						<div className={styles.qnaHistoryContnt}>{qna.qnaTitle}</div>
						<div className={styles.qnaHistortAnswer}>등록일:{dateFormatterYYYYMMDDHHmm(qna.createDate)}</div>

					</div>

					{
						Answer === qna.id &&
						<div className={styles.qnaHistoryDiv}>
							<div className={styles.qnaAnswer}>
								<div className={styles.qnaAnsWerMail}>유저 이메일 : {qna.email}</div>
							</div>
							<div className={styles.qnaAnswerContent}>내용: {qna.qnaContent}</div>


							{
								qna.qnaAnswer === null ?
									<div>
										<div className={styles.qnaAnswerD}>
											<div className={styles.qnaAswerAswerContent}>아직 답변이 등록되지 않았습니다</div>
										</div>
										<div className={styles.qnaAnswerDiv}>
											<div className={styles.qnaManagerAnswer}>답변:</div>
											<textarea placeholder="답변을 입력해 주세요" className={styles.qnaManagerAnswerContent}
												onChange={(e) => {
													setQnaManagerAnswer(e.target.value);
												}} />
											<button onClick={() => insertAnswer(qna.id)} className={styles.qnaManagerButton}>답변 등록</button>
										</div>

									</div>


									:
									<div className={styles.qnaAnswerD}>
										<div className={styles.qnaAnswerAswer}>답변 </div>
										<div className={styles.qnaAswerAswerContent}>{qna.qnaAnswer}</div>
									</div>}


						</div>}

				</div>
			);
		})
			:
			<div className={styles.nullQna}>입력된 1:1 문의가 없습니다.</div>
	)
}
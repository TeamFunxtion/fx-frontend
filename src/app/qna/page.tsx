"use client"
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { userInfoState } from "@/store/atoms";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { qnaCategories } from "@/app/constants"
import Pagination from '@mui/material/Pagination';
import { dateFormatterYYYYMMDDHHmm } from "@/utils/common";

export default function Qna() {


	const [list, setList] = useState([]);
	const [qnaContentCh, setQnaContentCh] = useState(Number(1));
	const [currentPage, setCurrentPage] = useState(Number(1));
	const searchParams = useSearchParams();
	const [Answer, setAnswer] = useState("");
	const [pageInfo, setPageInfo] = useState({
		totalPages: 1,
		totalElements: 1,
	});
	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;
	const userEmail = userInfoValue.email;
	const qnaContentlist = (id) => {
		setQnaContentCh(id);
	};
	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/qna?&page=${value}`)
	};
	const getList = async (pageNo) => {
		const result = await api.get(`/qnas/userId?id=${userId}`, {
			params: {
				page: pageNo || 1,
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
		if (!searchParams.get("page")) {
			setCurrentPage(1);
			getList(1);
		} else {
			getList(currentPage);
		}

	}, [searchParams])


	const qnaAnswerConten = (id) => {
		if (Answer === id) {
			setAnswer("");
		} else {
			setAnswer(id);
		}

	}




	function QnaInquiryHistory() {
		return (


			list.length > 0 && list.map(function (qna) {


				return (
					<div>

						<div className={styles.qnaHistoryDiv} onClick={() => qnaAnswerConten(qna.id)}>


							<div className={styles.qnaHistoryTag}>{qna.categoryId}</div>
							<div className={styles.qnaHistoryContnt}>{qna.qnaTitle}</div>
							<div className={styles.qnaHistortAnswer}>등록일:{dateFormatterYYYYMMDDHHmm(qna.createDate)}</div>
						</div>
						{
							Answer === qna.id &&
							<div className={styles.qnaHistoryDiv}>
								<div className={styles.qnaAnswer}>
									{/* <div className={styles.qnaAnswerName}>작성자 : {userId}</div> */}
									<div className={styles.qnaAnsWerMail}>이메일 : {userEmail}</div>
								</div>
								<div className={styles.qnaAnswerContent}>내용: {qna.qnaContent}</div>


								{
									qna.qnaAnswer === null ?

										<div className={styles.qnaAnswerD}>
											<div className={styles.qnaAswerAswerContent}>아직 답변이 등록되지 않았습니다</div>
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

		)
	}

	function QnaInquiry() {
		const [qnaContent, setQnaContent] = useState('');
		const [qnaTitle, setQnaTitle] = useState('');
		const [categoryId, setCategoryId] = useState('개인정보/회원정보');


		const createQna = async () => {
			const res = await api.post(`qnas/uplod`, { userId: userId, categoryId: categoryId, qnaTitle: qnaTitle, qnaContent: qnaContent });
			const { data: { resultCode, msg, data } } = res;
			if (resultCode == '200') {
				toast.success(msg || ` `);

			}
		}


		return (
			<div >
				<div className={styles.qnaInquirtTop}>
					<div className={styles.qnaInquirtName} ><div>*유형</div></div>
					<select className={styles.qnaInquirtCategory} value={categoryId}
						onChange={(e) => {
							setCategoryId(e.target.value);
						}}>

						{

							qnaCategories.map((category) => (

								<option value={category.categoryName}>{category.categoryName}</option>
							))


						}



					</select>
				</div>

				<div className={styles.qnaInquirt}>
					<div className={styles.qnaInquirtName}><div>*제목</div></div>
					<input type="text" className={styles.qnaInquirtNameInput} placeholder="제목을 입력해 주세요"
						value={qnaTitle}
						onChange={(e) => {
							setQnaTitle(e.target.value)
						}}
					/>
				</div>

				<div className={styles.qnaIpquirtContent} >
					<textarea className={styles.qnaIpquirtContentInput} placeholder="내용 입력" value={qnaContent}
						onChange={(e) => {
							setQnaContent(e.target.value)
						}}

					/>
				</div>
				<div className={styles.qnaInquirtButton}>
					{
						userInfoValue.email != "" &&


						<button className={styles.qnaInquirtButtonInquirt} onClick={createQna}>문의하기</button>
					}
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


					<div className={qnaContentCh === 1 ? styles.qnaInquiryHistoryOn : styles.qnaInquiryHistoryOff} onClick={() => qnaContentlist(1)}>문의/안내 내역</div>


					<div className={qnaContentCh === 2 ? styles.qnaInquiryOn : styles.qnaInquiryOff} onClick={() => qnaContentlist(2)}>문의하기</div>
				</div>
				<br />
				<div className={styles.qnaContent}>
					{
						qnaContentCh === 1 ?
							<div>
								<QnaInquiryHistory />
								<div>
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
								</div>
							</div>
							: <QnaInquiry />
					}
				</div>
			</section >

		</div >

	)

}
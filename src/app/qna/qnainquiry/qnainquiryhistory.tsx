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


export default function QnaInquiryHistory() {


	const [list, setList] = useState([]);
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
	const useRole = userInfoValue.roleId;
	const router = useRouter();
	
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/qna?&page=${value}`)
	};
	const getList = async (pageNo) => {
		const result = await api.get(`/qnas?id=${userId}`, {
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


	


	const qnaAnswerContent = (id) => {
		if (Answer === id) {
			setAnswer("");
		} else {
			setAnswer(id);
		}
	}



	function QnaInquiryHistoryBack() {
		return (

			
			list.length > 0 ? list.map(function (qna) {
				return (
					
					<div>
							
							
						<div className={styles.qnaHistoryDiv} onClick={() => qnaAnswerContent(qna.id)}>
							<div className={styles.qnaHistoryTag}>{getQnaCategoryNameKR(qna.categoryId)}</div>
							<div className={styles.qnaHistoryContnt}>{qna.qnaTitle}</div>
							<div className={styles.qnaHistortAnswer}>등록일:{dateFormatterYYYYMMDDHHmm(qna.createDate)}</div>
						</div>
						
						{
							Answer === qna.id &&
							<div className={styles.qnaHistoryDiv}>
								<div className={styles.qnaAnswer}>
									<div className={styles.qnaAnsWerMail}>이메일 : {userEmail}</div>
								</div>
								<div className={styles.qnaAnswerContent}>내용: {qna.qnaContent}</div>


								{
									qna.qnaAnswer === null ?
										<div>
											<div className={styles.qnaAnswerD}>
											<div className={styles.qnaAswerAswerContent}>아직 답변이 등록되지 않았습니다</div>
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

	return (
		<div>
			<div>
			<QnaInquiryHistoryBack />
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
		</div>

	)
}

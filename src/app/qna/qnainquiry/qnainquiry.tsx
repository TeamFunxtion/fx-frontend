"use client"
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { userInfoState } from "@/store/atoms";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { qnaCategories } from "@/app/constants"



export default function QnaInquiry() {
	const [qnaContent, setQnaContent] = useState('');
	const [qnaTitle, setQnaTitle] = useState('');
	const [categoryId, setCategoryId] = useState('QNA01');

	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;
	const userEmail = userInfoValue.email;

	const createQna = async () => {
		const res = await api.post(`qnas`, { userId: userId, categoryId: categoryId, qnaTitle: qnaTitle, qnaContent: qnaContent });
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

							<option value={category.categoryId}>{category.categoryName}</option>
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
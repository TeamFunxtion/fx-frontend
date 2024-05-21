"use client";
import React, { useState } from 'react';
import api from '@/utils/api';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import styles from "./page.module.css";

export default function NoticeNewPage() {
	const [faqContent, setFaqContent] = useState('');
	const [faqTitle, setFaqTitle] = useState('');
	const router = useRouter();
	const userInfoValue = useRecoilValue(userInfoState);

	const userRoleId = userInfoValue.roleId;

	const createFaq = async () => {
		if (userRoleId !== 2) {
			toast.error("접근 권한이 없습니다.");
			return;
		}

		if (faqTitle === '') {
			toast.error("타이틀을 입력해 주세요");
		} else if (faqContent === '') {
			toast.error("내용을 입력해 주세요");
		} else {
			try {
				const res = await api.post('/faqs', { faqTitle: faqTitle, faqContent: faqContent });
				const { data: { resultCode, msg } } = res;
				if (resultCode === '200') {
					toast.success(msg || '성공적으로 생성되었습니다.');
					router.push(`/faq`);
				} else {
					toast.error(msg || '알 수 없는 오류가 발생했습니다.');
				}
			} catch (error) {
				if (error.response) {
					// 서버에서 응답을 받았지만, 2xx 범위의 상태 코드는 아닌 경우
					console.error('서버 오류:', error.response.data);
					toast.error(`서버 오류: ${error.response.data.message}`);
				} else if (error.request) {
					// 요청이 만들어졌으나, 서버에서 응답이 없었음
					console.error('네트워크 오류:', error.request);
					toast.error('네트워크 오류: 서버에 연결할 수 없습니다.');
				} else {
					// 요청을 설정하는 과정에서 오류가 발생했음
					console.error('오류:', error.message);
					toast.error(`오류: ${error.message}`);
				}
			}
		}
	}

	const faqMove = () => {
		router.push(`/faq`);
	}

	return (
		<div className={styles.faqDiv}>
			<h1 className={styles.Newfaq}>새 글 등록</h1>
			<div>
				<label className={styles.faqContent}>제목:</label>
				<input
					className={styles.faqNewContent}
					type="text"
					name="faqTitle"
					value={faqTitle}
					onChange={(e) => {
						setFaqTitle(e.target.value);
					}}
					required
				/>
			</div>
			<div className={styles.faqNewArea}>
				<label className={styles.faqContent}>내용:</label>
				<textarea
					className={styles.faqNewContent}
					name="faqContent"
					value={faqContent}
					onChange={(e) => {
						setFaqContent(e.target.value);
					}}
					required
				></textarea>
			</div >
			<div className={styles.faqButtonArea}>
				<button className={styles.faqUpdateButton} onClick={createFaq}>등록</button>
				<button className={styles.faqUpdateButton} onClick={faqMove}>목록가기</button>
			</div>
		</div>
	);
}
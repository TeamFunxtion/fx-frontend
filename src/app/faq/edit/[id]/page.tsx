"use client";
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import styles from "./page.module.css";

interface IParams {
	params: { id: string }
}

export default function EditFAQPage({ params: { id } }: IParams) {
	const [faqDetail, setFaqDetail] = useState({ faqTitle: '', faqContent: '' });
	const router = useRouter();
	const userInfoValue = useRecoilValue(userInfoState);

	const userRoleId = userInfoValue.roleId;

	const faqMove = () => {
		router.push(`/faq`);
	}
	const updateFaq = async () => {
		if (userRoleId !== 2) {
			toast.error("접근 권한이 없습니다.");
			return;
		}

		if (faqDetail.faqTitle === '') {
			toast.error("제목을 입력해 주세요");
		} else if (faqDetail.faqContent === '') {
			toast.error("내용을 입력해 주세요");
		} else {
			try {
				const res = await api.patch(`/faqs/${id}`, faqDetail);
				const { resultCode, msg } = res.data;
				if (resultCode === '200') {
					toast.success(msg || `FAQ가 성공적으로 수정되었습니다.`);
					router.push(`/faq`);
				} else {
					toast.error(msg || `FAQ 수정 중 오류가 발생했습니다.`);
				}
			} catch (error) {
				console.error('Error updating FAQ:', error);
				toast.error('FAQ를 수정하는 중 오류가 발생했습니다.');
			}
		}
	};

	const getFaqDetail = async () => {
		try {
			const result = await api.get(`/faqs/${id}`);
			setFaqDetail(result.data.data);
		} catch (error) {
			console.error('Error fetching FAQ:', error);
			toast.error('FAQ를 불러오는 중 오류가 발생했습니다.');
		}
	};

	useEffect(() => {
		if (userRoleId !== 2) {
			toast.error("접근 권한이 없습니다.");
			router.push('/faq');
		} else {
			getFaqDetail();
		}
	}, [userRoleId]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFaqDetail((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className={styles.faqDiv}>
			<h2 className={styles.faqUpdate}>FAQ 수정</h2>
			<div>
				<label className={styles.faqContent}>제목 : </label>
				<input
					className={styles.faqUpdateTitle}
					type="text"
					name="faqTitle"
					value={faqDetail.faqTitle}
					onChange={handleInputChange}
				/>
			</div>
			<div className={styles.faqNewArea}>
				<label className={styles.faqContent}>내용 : </label>
				<textarea
					className={styles.faqUpdateTitle}
					name="faqContent"
					value={faqDetail.faqContent}
					onChange={handleInputChange}
				/>
			</div>
			<div className={styles.faqButtonArea}>
				<button className={styles.faqUpdateButton} onClick={updateFaq}>저장</button>
				<button className={styles.faqUpdateButton} onClick={faqMove}>목록가기</button>
			</div>
		</div>
	);
}
"use client";
import React, { useState } from 'react';
import styles from './page.module.css';
import api from '@/utils/api';
import toast from "react-hot-toast";
import Etcsidebar from "@/components/etc/etcsidebar";
import { useRouter } from "next/navigation"

export default function NoticeNewPage() {
	const [notcieContent, setNoticeContent] = useState('');
	const [noticeTitle, setNoticeTitle] = useState('');
	const router = useRouter();
	const createNotice = async () => {
		const res = await api.post(`/notices`, { noticeTitle: noticeTitle, noticeContent: notcieContent });
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || ` `);
			router.push(`/notice`);
		}
	}

	return (

		<div className={styles.noticeInsertMain}>
			<Etcsidebar />

			<section className={styles.noticeSection}>
				<div className={styles.noticeInquirtTop}>
				</div>

				<div className={styles.noticeInquirt}>
					<div className={styles.noticeInquirtName}><div>*제목</div></div>
					<input type="text" className={styles.noticeInquirtNameInput} placeholder="제목을 입력해 주세요"
						value={noticeTitle}
						onChange={(e) => {
							setNoticeTitle(e.target.value)
						}}
					/>
				</div>

				<div className={styles.noticeIpquirtContent} >
					<textarea className={styles.noticeIpquirtContentInput} placeholder="내용 입력"
						value={notcieContent}
						onChange={(e) => {
							setNoticeContent(e.target.value)
						}}
					/>
				</div>
				<div className={styles.noticeInquirtButton}>

					<button className={styles.noticeInquirtButtonInquirt} onClick={createNotice}>공지등록</button>
					<button className={styles.noticeInquirtButtonMenu}>목록가기</button>
				</div>
			</section>
		</div>


	)
}
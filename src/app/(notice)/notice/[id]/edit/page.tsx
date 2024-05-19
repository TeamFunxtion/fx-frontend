"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import api from '@/utils/api';
import toast from "react-hot-toast";
import Etcsidebar from "@/components/etc/etcsidebar";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";

export default function NoticeNewPage() {


	const [list, setList] = useState([]);
	const [notcieContent, setNoticeContent] = useState('');
	const [noticeTitle, setNoticeTitle] = useState('');
	const router = useRouter();
	const  id = usePathname().substring(8).replace(/[^0-9]/g, "");
	

	const updateNotice = async () => {
		const res = await api.patch(`/notices`, { noticeId: Number(id), noticeTitle: noticeTitle, noticeContent: notcieContent });
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || ` `);
			router.push(`/notice`);
		}
	}

	const getList = async () => {
		const result = await api.get(`/notices/${id}`);
		console.log(result.data.data);
		setList(result.data.data);
	}
	useEffect(() => {
		getList();

	}, [])

	

	console.log(list,11)
	return (

		<div className={styles.noticeInsertMain}>
			<Etcsidebar />

			<section className={styles.noticeSection}>
				
				

					
				<div className={styles.noticeInquirtTop}></div>
			
				<div className={styles.noticeInquirt}>
					<div className={styles.noticeInquirtName}><div>*제목</div></div>
					<input type="text" className={styles.noticeInquirtNameInput} placeholder={list.noticeTitle}
						value={noticeTitle}
						onChange={(e) => {
							setNoticeTitle(e.target.value)
						}}
					></input>
				</div>

				<div className={styles.noticeIpquirtContent} >
					<textarea className={styles.noticeIpquirtContentInput} placeholder={list.noticeContent}
						value={notcieContent}
						onChange={(e) => {
							setNoticeContent(e.target.value)
						}}>{list.noticeContent}</textarea>
				</div>
				
				
					

				<div className={styles.noticeInquirtButton}>

					<button className={styles.noticeInquirtButtonInquirt} onClick={updateNotice}>공지수정</button>
					<button className={styles.noticeInquirtButtonMenu}>목록가기</button>
				</div>
			</section>
		</div>


	)
}
"use client";
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from "next/navigation";

interface IParams {
	params: { id: string }
}

export default function EditFAQPage({
	params: { id }
}: IParams) {
	const [faqDetail, setFaqDetail] = useState([]);
	const [faqContent, setFaqContent] = useState('');
	const [faqTitle, setFaqTitle] = useState('');
	const router = useRouter();
	// const [id, setId] = useState('');

	useEffect(() => {
		// const path = usePathname();
		// const extractedId = path.substring(8).replace(/[^0-9]/g, "");
		// setId(extractedId);
	}, []);

	const updateFaq = async () => {
		if (faqTitle === '') {
			toast.error("제목을 입력해 주세요");
		} else if (faqContent === '') {
			toast.error("내용을 입력해 주세요");
		} else {
			try {
				const res = await api.patch(`/faqs/${id}`, { faqTitle: faqTitle, faqContent: faqContent });
				const { data: { resultCode, msg } } = res;
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
	}

	const getFaqDetail = async () => {
		try {
			const result = await api.get(`/faqs/${id}`);
			setFaqDetail(result.data.data);
			setFaqTitle(result.data.data.faqTitle);
			setFaqContent(result.data.data.faqContent);
		} catch (error) {
			console.error('Error fetching FAQ:', error);
			toast.error('FAQ를 불러오는 중 오류가 발생했습니다.');
		}
	}

	useEffect(() => {
		getFaqDetail();
	}, [id]);

	const faqMove = () => {
		router.push(`/faq`);
	}

	return (
		<div>
			<h1>FAQ 수정</h1>
			<div>
				<label htmlFor="faqTitle">제목:</label>
				<input
					type="text"
					id="faqTitle"
					value={faqTitle}
					onChange={(e) => setFaqTitle(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="faqContent">내용:</label>
				<textarea
					id="faqContent"
					value={faqContent}
					onChange={(e) => setFaqContent(e.target.value)}
					required
				></textarea>
			</div>
			<button onClick={updateFaq}>수정 완료</button>
			<button onClick={faqMove}>목록가기</button>
		</div>
	);
}
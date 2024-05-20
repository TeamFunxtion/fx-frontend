"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import api from '@/utils/api';
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useRouter } from "next/navigation";
import { dateFormatterYYYYMMDDHHmm } from '@/utils/common';
import toast from 'react-hot-toast';

// FAQPage 컴포넌트
export default function FAQPage() {
	const [faqList, setFaqList] = useState([]);
	const [openIndex, setOpenIndex] = useState(null);
	const searchParams = useSearchParams();
	const router = useRouter();

	const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
	const [pageInfo, setPageInfo] = useState({
		totalPages: 1,
		totalElements: 1,
	});

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/faq?keyword=${searchParams.get("keyword") || ''}&page=${value}`);
	};

	const getList = async (pageNo) => {
		const result = await api.get("/faqs", {
			params: {
				page: pageNo || 1,
			}
		});

		setFaqList(result.data.content);
		setPageInfo({
			totalPages: result.data.totalPages,
			totalElements: result.data.totalElements,
		});
	};

	useEffect(() => {
		getList(currentPage);
	}, [currentPage]);

	const toggleAccordion = (index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	useEffect(() => {
		if (!searchParams.get("page")) {
			setCurrentPage(1);
			getList(1);
		} else {
			getList(currentPage);
		}
	}, [searchParams]);

	const handleNewPostClick = () => {
		router.push('/faq/newfaq');
	};

	// 수정 페이지로 이동하는 함수
	const handleEditClick = (id) => {
		router.push(`/faq/edit/${id}`);
	};

	const deleteFaq = async (id) => {
		const res = await api.delete(`/faqs/${id}`);
		const { resultCode, msg } = res.data;
		if (resultCode === '200') {
			toast.success(msg || `삭제가 완료되었습니다.`);
			getList(currentPage);
		} else {
			toast.error(msg || `삭제 중 오류가 발생했습니다.`);
		}
	};

	return (
		<div>
			<div className={styles.noticeMain}>
				<aside className={styles.noticeAside}>
					<h3 className={styles.noticeNotice}>고객센터</h3>
					<br />
					<li><a href="/">공지사항</a></li>
					<li><a href="/faq">자주 묻는 질문</a></li>
					<li><a href="/notice/">1:1문의</a></li>
				</aside>
				<button onClick={handleNewPostClick}>새 글 등록</button>
				<div className={styles.container}>
					<section className={styles.noticeSection}>
						<div className={styles.noticeDiv}>
							{faqList.map((faq, index) => (
								<AccordionItem
									key={index}
									index={index}
									id={faq.id}
									question={faq.faqTitle}
									answer={faq.faqContent}
									isOpen={openIndex === index}
									toggleAccordion={toggleAccordion}
									createdate={faq.createDate}
									dateFormatterYYYYMMDDHHmm={dateFormatterYYYYMMDDHHmm}
									onEditClick={() => handleEditClick(faq.id)}
									deleteFaq={() => deleteFaq(faq.id)}
								/>
							))}
						</div>
						{faqList.length == 0 && <div className={styles.noResult}>😝 조회된 결과가 없습니다.</div>}
						{faqList.length > 0 && (
							<div className={styles.paginationBar}>
								<Pagination
									count={pageInfo.totalPages}
									page={currentPage}
									onChange={handleChange}
									showFirstButton={true}
									showLastButton={true}
									size='large'
								/>
							</div>
						)}
					</section>
				</div>
			</div>
		</div>
	);
}

// AccordionItem 컴포넌트
function AccordionItem({ index, question, answer, isOpen, toggleAccordion, createdate, updatedate, id, dateFormatterYYYYMMDDHHmm, onEditClick, deleteFaq }) {
	return (
		<div className={styles.noticeDiv} onClick={() => toggleAccordion(index)}>
			<div className={styles.noticeisOpen}>
				<div className={styles.noticeQ}>Q</div>
				<h3 className={styles.noticeContent}>{question}</h3>
				<div className={styles.noticeContent}>작성자:{id}</div>
				<div className={styles.noticeSysdate}>{dateFormatterYYYYMMDDHHmm(createdate)}</div>
				<div className={styles.noticeSysdate}>{updatedate}</div>
				{isOpen ? '-' : '+'}
				{/* 수정 버튼 */}
				<button onClick={(e) => {
					e.stopPropagation(); // 부모 요소로의 이벤트 전파 방지
					onEditClick(); // 수정 버튼 클릭 시 이벤트 핸들러 호출
				}}>수정</button>
				<button onClick={(e) => {
					e.stopPropagation(); // 부모 요소로의 이벤트 전파 방지
					deleteFaq(); // 삭제 버튼 클릭 시 이벤트 핸들러 호출
				}}>삭제</button>
			</div>
			{isOpen && <div>{answer}</div>}
		</div>
	);
}
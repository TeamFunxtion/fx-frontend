"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import api from '@/utils/api';
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useRouter } from "next/navigation";
import { dateFormatterYYYYMMDDHHmm } from '@/utils/common';
import toast from 'react-hot-toast';
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import Etcsidebar from "@/components/etc/etcsidebar";

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
	const userInfoValue = useRecoilValue(userInfoState);

	const userRoleId = userInfoValue.roleId;

	const handleChange = (event, value) => {
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
		if (userRoleId === 2) {
			router.push('/faq/newfaq');
		} else {
			toast.error("접근 권한이 없습니다.");
		}
	};

	const handleEditClick = (id) => {
		if (userRoleId === 2) {
			router.push(`/faq/edit/${id}`);
		} else {
			toast.error("접근 권한이 없습니다.");
		}
	};

	const deleteFaq = async (id) => {
		if (userRoleId !== 2) {
			toast.error("접근 권한이 없습니다.");
			return;
		}
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
					<br />
					<Etcsidebar />
				</aside>
				{userRoleId === 2 && <button onClick={handleNewPostClick}>새 글 등록</button>}
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
									userRoleId={userRoleId}
								/>
							))}
						</div>
						{faqList.length === 0 && <div className={styles.noResult}>😝 조회된 결과가 없습니다.</div>}
						{faqList.length > 0 && (
							<div className={styles.paginationBar}>
								<Pagination
									count={pageInfo.totalPages}
									page={currentPage}
									onChange={handleChange}
									showFirstButton
									showLastButton
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

function AccordionItem({ index, question, answer, isOpen, toggleAccordion, createdate, id, dateFormatterYYYYMMDDHHmm, onEditClick, deleteFaq, userRoleId }) {
	return (
		<div className={styles.noticeDiv} onClick={() => toggleAccordion(index)}>
			<div className={styles.noticeisOpen}>
				<div className={styles.noticeQ}>Q</div>
				<h3 className={styles.noticeContent}>{question}</h3>
				<div className={styles.noticeSysdate}>{dateFormatterYYYYMMDDHHmm(createdate)}</div>
				{isOpen ? '-' : '+'}
				{userRoleId === 2 && (
					<>
						<button onClick={(e) => {
							e.stopPropagation();
							onEditClick();
						}}>수정</button>
						<button onClick={(e) => {
							e.stopPropagation();
							deleteFaq();
						}}>삭제</button>
					</>
				)}
			</div>
			{isOpen && <div>{answer}</div>}
		</div>
	);
}
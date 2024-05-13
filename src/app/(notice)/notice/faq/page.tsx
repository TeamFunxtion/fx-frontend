"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import api from '@/utils/api';

// FAQPage 컴포넌트
export default function FAQPage() {
	const [faqList, setFaqList] = useState([]);
	const [openIndex, setOpenIndex] = useState(null);

	useEffect(() => {
		async function fetchFaqs() {
			const response = await api.get("/faqs");
			setFaqList(response.data);
		}
		fetchFaqs();
	}, []);

	const toggleAccordion = (index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div>
			<div className={styles.noticeMain}>
				<aside className={styles.noticeAside}>
					<h3 className={styles.noticeNotice}>고객센터</h3>
					<br />
					<li><a href="/">공지사항</a></li>
					<li><a href="/notice/faq">자주 묻는 질문</a></li>
					<li><a href="/notice/">1:1문의</a></li>
				</aside>
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
									updatedate={faq.updateDate}
								/>
							))}
						</div>
						<div>
							<ul className={styles.noticePage}>
								<li><a href="" className={styles.noticePageUpDown}>이전</a></li>
								<li><a href="" className={styles.noticePageNum}>1</a></li>
								<li><a href="" className={styles.noticePageNum}>2</a></li>
								<li><a href="" className={styles.noticePageNum}>3</a></li>
								<li><a href="" className={styles.noticePageUpDown}>다음</a></li>
							</ul>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

// AccordionItem 컴포넌트
function AccordionItem({ index, question, answer, isOpen, toggleAccordion, createdate, updatedate, id }) {
	return (
		<div className={styles.noticeDiv} onClick={() => toggleAccordion(index)}>
			<div className={styles.noticeisOpen}>
				<div className={styles.noticeQ}>Q</div>
				<h3 className={styles.noticeContent}>{question}</h3>
				<div className={styles.noticeContent}>작성자:{id}</div>
				<div className={styles.noticeSysdate}>{createdate}</div>
				<div className={styles.noticeSysdate}>{updatedate}</div>
				{isOpen ? '-' : '+'}
			</div>
			{isOpen && <div>{answer}</div>}
		</div>
	);
}
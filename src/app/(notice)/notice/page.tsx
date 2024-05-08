"use client"
import styles from "./page.module.css";
import {data} from './data';
import React,{useState} from "react";
import SingleQuestion from './Question'


export default function Notice({

}) {
	const [question, setQuestion] = useState<any[]>(data);
	const [index,setIndex] = useState<number>(0);



	return (
		<div className={styles.noticeMain}>
			<aside className={styles.noticeAside}>
				<h3 className={styles.noticeNotice}>고객센터</h3>
				<br />
				<li><a href="/notice/">공지사항</a></li>
				<li><a href="/notice/">자주 묻는 질문</a></li>
				<li><a href="/notice/">1:1문의</a></li>
			</aside>

			<section className={styles.noticeSection}>
				<div className="container">
				<section className="info">
					{question.map((val) =>(
					<SingleQuestion key = {val.id}
					setIndex={setIndex} index={index} {...val}/>
				))}
				</section>
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


	);
}
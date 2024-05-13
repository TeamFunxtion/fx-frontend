"use client"
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";;
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from '@mui/material/Pagination';

export default function Faq() {
	return (
		<div className={styles.noticeMain}>
			<aside className={styles.noticeAside}>
				<h3 className={styles.noticeNotice}>고객센터</h3>
				<br />

				<li><a href="/notice/">공지사항</a></li>
				<li><a href="/notice/">자주 묻는 질문</a></li>

				<li><a href="/">공지사항</a></li>
				<li><a href="/notice/faq">자주 묻는 질문</a></li>
				<li><a href="/notice/">1:1문의</a></li>
			</aside>





		</div>


	);

}
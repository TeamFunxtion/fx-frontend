"use client"
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";;

export default function Notice() {

	
	const [Page,setPage] = useState(1);
	const [list, setList] = useState();
	const [idcode, setIdcode] = useState("")
	const getList = async () => {
		const result = await api.get(`/notices?page=${Page-1}`);
		console.log(result.data);
		setList(result.data);
	}

	useEffect(() => {
		getList();
	}, [Page])


	const PageNum = (num) =>{  	
		setPage(num);
	}
	const PageDown = () =>{  	
		
		setPage(Page-1);
	}
	const PageUp = () =>{  	
	
		setPage(Page+1);
	}

	const accordion = (id: string) => {
		console.log(id);
		if (idcode === id) {
			setIdcode("")
			console.log(idcode);
		} else {
			setIdcode(id)
			console.log(idcode);
		}

	};


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


			
				{
					list != null &&
					list.map(function (notice) {
						return (
							
							<div className="container">
								<div className={styles.noticeDiv} onClick={() => accordion(notice.id)}>
									<div className={styles.noticeQ}>Q</div>
									<div className={styles.noticeTitle} >{notice.title}</div>
									<div className={styles.noticeSysdate}>{notice.createDate}</div>
									<div className={styles.noticeIc}>
										{notice.id === idcode ?
											<IoIosArrowUp /> : <IoIosArrowDown />
										}
									</div>
								</div>
								{notice.id === idcode && <div className={styles.noticeContent}><p className={styles.noticeContentDetail}>{notice.content}</p></div>}
							</div>
						);
					})}
			


				<div>
					<ul className={styles.noticePage}>
						{Page <= 1 ?
						<li className={styles.noticePageUpDownBlock}><a className={styles.noticePageUpDown}>이전</a></li>
						:
						<li><a onClick={() => PageDown()} className={styles.noticePageUpDown}>이전</a></li>
						}
						
						
						<li><a href="" className={styles.noticePageNum}>3</a></li>
						<li><a onClick={() => PageUp()} className={styles.noticePageUpDown}>다음</a></li>
					</ul>
				</div>
			</section>


		</div>


	);
}
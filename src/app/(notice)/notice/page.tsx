"use client"
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";;
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from '@mui/material/Pagination';
import { dateFormatterYYYYMMDDHHmm } from "@/utils/common";
import Etcsidebar from "@/components/etc/etcsidebar";
export default function Notice() {


	const searchParams = useSearchParams();
	const [list, setList] = useState([]);
	const [currentPage, setCurrentPage] = useState(Number(1));
	const [idcode, setIdcode] = useState("");
	const [pageInfo, setPageInfo] = useState({
		totalPages: 1,
		totalElements: 1,
	});
	const router = useRouter();
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/notice?keyword=${searchParams.get("keyword") || ''}&page=${value}`)
		// getList(value);
	};
	const getList = async (pageNo) => {
		const result = await api.get("/notices", {
			params: {
				page: pageNo || 1,
			}
		});
		setList(result.data.content);

		setPageInfo({
			totalPages: result.data.totalPages,
			totalElements: result.data.totalElements,
		})
	}


	useEffect(() => {
		getList(currentPage);
	}, [])


	useEffect(() => {
		if (!searchParams.get("page")) {
			setCurrentPage(1);
			getList(1);
		} else {
			getList(currentPage);
		}

	}, [searchParams])

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
			<Etcsidebar />

			<section className={styles.noticeSection}>



				{
					list.length > 0 && list.map(function (notice) {
						return (

							<div className="container">
								<div className={styles.noticeDiv} onClick={() => accordion(notice.id)}>
									<div className={styles.noticeQ}>Q</div>
									<div className={styles.noticeTitle} >{notice.title}</div>
									<div className={styles.noticeSysdate}>{dateFormatterYYYYMMDDHHmm(notice.createDate)}</div>
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

						{
							list.length > 0 && <div className={styles.paginationBar}>
								<Pagination
									count={pageInfo.totalPages}
									page={currentPage}
									onChange={handleChange}
									showFirstButton={true}
									showLastButton={true}
									size='large'
								/>
							</div>
						}
					</ul>
				</div>
			</section>


		</div>


	);
}
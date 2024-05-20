"use client"
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";;
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from '@mui/material/Pagination';
import { dateFormatterYYYYMMDDHHmm } from "@/utils/common";
import Etcsidebar from "@/components/etc/etcsidebar";
import toast from "react-hot-toast";
export default function Notice() {


	const searchParams = useSearchParams();
	const [list, setList] = useState([]);
	const [currentPage, setCurrentPage] = useState(Number(1));
	const [idcode, setIdcode] = useState("");
	const [pageInfo, setPageInfo] = useState({
		totalPages: 1,
		totalElements: 1,
	});

	const userInfoValue = useRecoilValue(userInfoState);


	const userRoleId = userInfoValue.roleId;


	const router = useRouter();
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
		router.push(`/notice?keyword=${searchParams.get("keyword") || ''}&page=${value}`)
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
		if (idcode === id) {
			setIdcode("")
		} else {
			setIdcode(id)
		}

	};

	const newMove = () => {
		router.push(`/notice/new`);
	}

	const updateMove = (noticeId) => {
		router.push(`/notice/${noticeId}/edit`);
	}


	const deleteMove = async (id) => {
		const res = await api.delete(`/notices/${id}`);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || ` `);
			getList(currentPage);
		}
	}

	
	return (
		<div className={styles.noticeMain}>
			<Etcsidebar />

			<section className={styles.noticeSection}>

				{
					userRoleId === 2 &&
					<div className={styles.noticeMove}>
						<button onClick={() => newMove()} className={styles.noticeMoveButton}>공지등록</button>
					</div>
				}
					{list.length <=0 &&
						<div className={styles.nullNotice}>입력된 공지사항이 없습니다.</div>
					}
				{
					list.length > 0 && list.map(function (notice) {
						return (
							
							<div className="container">
																							
								<div className={styles.noticeDiv} onClick={() => accordion(notice.id)}>
									<div className={styles.noticeQ}>Q</div>
									<div className={styles.noticeTitle} >{notice.noticeTitle}</div>
									<div className={styles.noticeSysdate}>{dateFormatterYYYYMMDDHHmm(notice.createDate)}</div>
									<div className={styles.noticeIc}>
										{notice.id === idcode ?
											<IoIosArrowUp /> : <IoIosArrowDown />
										}
									</div>
								</div>
					
								{notice.id === idcode && <div className={styles.noticeContent}><p className={styles.noticeContentDetail}>{notice.noticeContent}</p>
									{userRoleId === 2 &&
										<div>
											<button onClick={() => updateMove(notice.id)}>수정</button>
											<button onClick={() => deleteMove(notice.id)}>삭제</button>
										</div>
									}
								</div>
								}
							
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

			</section >


		</div >


	);
}
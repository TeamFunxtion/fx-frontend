"use client"
import Navigation from "./navigation";
import styles from "./header.module.css";
import { BsSearch, BsBell, BsBagPlus, BsChatDots, BsPerson, BsCurrencyDollar, BsXLg, BsX } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderTop from "./header-top";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import NoResult from "../NoResult";
import _ from "lodash"

export default function Header() {
	return (
		<header className={styles.header}>
			{/* <HeaderTop /> */}
			<HeaderMain />
			<Navigation />
		</header>
	)
}

function HeaderMain() {
	const [keyword, setKeyword] = useState("");
	const router = useRouter();
	const user = useRecoilValue(userInfoState);
	const [searchHistory, setSeachHistory] = useState([]);
	const [showHistory, setShowHistory] = useState(false);

	const onKeyEnter = (e) => {
		if (e.key === 'Enter') {
			addSearchHistory(keyword);
			router.push(`/search?keyword=${keyword}&page=1`);
			setKeyword('');
			setShowHistory(false)
		}
	}

	const onChangeKeyword = (e) => {
		setKeyword(e.target.value);
	}

	const onClickLink = (path) => {
		if (!user.id) {
			router.push("/auth/login");
		} else {
			router.push(path);
		}
	}

	const addSearchHistory = (addItem) => {
		if (!addItem) return;

		let newList = [];
		const storageList = localStorage.getItem('searchHistory');
		if (storageList) {
			newList = JSON.parse(storageList);
		}
		const result = _.uniq([...newList, addItem]);
		localStorage.setItem('searchHistory', JSON.stringify(result));
	}

	const removeSearchHistory = (index) => {
		const newHistory = [...searchHistory.slice(0, index), ...searchHistory.slice(index + 1)];
		setSeachHistory(newHistory);
		localStorage.setItem('searchHistory', JSON.stringify(newHistory));
	}

	const removeAllHistory = () => {
		setSeachHistory([]);
		localStorage.setItem('searchHistory', JSON.stringify([]));
	}

	useEffect(() => {
		if (showHistory) {
			const storageList = localStorage.getItem('searchHistory');
			if (storageList) {
				setSeachHistory(JSON.parse(storageList))
			}
		}
	}, [showHistory])

	useEffect(() => {
		window.removeEventListener('click', searchHistoryToggleHandler);
		window.addEventListener('click', searchHistoryToggleHandler);
	}, [])

	function searchHistoryToggleHandler(e) {
		if (!e.target.closest('.inputContainer') && !e.target.closest('.searchHistoryContainer') && !e.target.closest('.searchHistoryRow')) {
			setShowHistory(false);
		}
	}

	return (
		<div className={styles.headerMain}>
			<div className={styles.mainLeft}>
				<Link href="/"><img src="/logo.png" /></Link>
				<div className={`${styles.inputContainer} inputContainer`}>
					<BsSearch />
					<input className={styles.searchInput}
						type="text"
						placeholder="어떤 상품을 찾고 계시나요?"
						value={keyword}
						onKeyDown={onKeyEnter}
						onChange={onChangeKeyword}
						onFocus={() => setShowHistory(true)}
						// onBlur={() => setShowHistory(true)}
						maxLength={30} />
				</div>
				{showHistory && <div className={`${styles.searchHistoryContainer} searchHistoryContainer`}>
					<h3>최근 검색어<span className={styles.historyAllRemove} onClick={removeAllHistory}>전체 삭제</span></h3>
					<ul>
						{
							searchHistory && searchHistory.map((keyword, index) => (
								<li className="searchHistoryRow">
									<span onClick={() => setShowHistory(false)}><Link href={`/search?keyword=${keyword}&page=1`}>{keyword}</Link></span>
									<span onClick={() => removeSearchHistory(index)}><BsX /></span>
								</li>
							))
						}
					</ul>
					{
						searchHistory && searchHistory.length === 0 &&
						<NoResult text="최근 검색어가 없습니다." />
					}
				</div>}
			</div>
			<div className={styles.mainRight}>
				<div className={styles.iconContainer} onClick={() => onClickLink('/notify')}>
					<Link href="">
						<BsBell />
						<span>알림</span>
					</Link>
				</div>
				<div className={styles.iconContainer} onClick={() => onClickLink('/products/new')}>
					<Link href="">
						<BsBagPlus />
						<span>판매하기</span>
					</Link>
				</div>
				<div className={styles.iconContainer} onClick={() => onClickLink('/chats')}>
					<Link href="">
						<BsChatDots />
						<span>채팅</span>
					</Link>
				</div>
				<div className={styles.iconContainer} onClick={() => onClickLink(`/shop/${user.id}/products`)}>
					<Link href="">
						<BsPerson />
						<span>마이</span>
					</Link>
				</div>
			</div>
		</div>
	)
}


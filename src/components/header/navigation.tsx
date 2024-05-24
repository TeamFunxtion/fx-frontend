'use client'
import { useState, useRef, useEffect } from "react";
import { BsList, BsX } from "react-icons/bs";
import styles from "./navigation.module.css";
import Link from "next/link";
import CategoryList from "./category-list";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userInfoState, useSsrComplectedState } from "@/store/atoms.js";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import LogoutModal from "../modal/LogoutModal";
import { getNotificationIcons, numberFormatter } from "@/utils/common";
import useModal from "@/hooks/useModal";
import PaymentModal from "../modal/PaymentModal";
import { API_URL } from "@/app/constants";
import toast from "react-hot-toast";

export default function Navigation() {
	const user = useRecoilValue(userInfoState);
	const resetUser = useResetRecoilState(userInfoState);
	const router = useRouter();
	const [showCategoryList, setShowCategoryList] = useState(false);
	const timer: any = useRef(null);
	const [showModalLogout, setShowModalLogout] = useState(false);
	const { modal, showModal, toggleModal } = useModal();

	const setSsrCompleted = useSsrComplectedState();
	useEffect(setSsrCompleted, [setSsrCompleted]);

	const handleShowCategory = (flag: boolean, isLazy: boolean) => {
		if (timer.current) clearTimeout(timer.current);
		if (!isLazy) {
			setShowCategoryList(flag);
		} else {
			if (!flag) {
				timer.current = setTimeout(() => {
					setShowCategoryList(flag);
				}, 1500);
			}
		}
	}

	const logout = async () => {
		const res = await api.post("/members/logout");
		const { data: { resultCode } } = res;
		if (resultCode == '200') {
			setShowModalLogout(false);
			resetUser();
			router.push("/");
		}
	}

	const onClickLogout = () => {
		setShowModalLogout(!showModalLogout);
	}

	useEffect(() => {
		if (user && user.id) {
			const eventSource = new EventSource(`${API_URL}/notify/events/${user.id}`);

			eventSource.onmessage = function (event) {
				console.log(event.data);
				const jsonData = JSON.parse(event.data);
				toast((t) => (
					<span>
						<img src={jsonData.data.thumbnailUrl} alt="" />
						{jsonData.message}
						<button onClick={() => toast.dismiss(t.id)}>
							Dismiss
						</button>
					</span>
				), {
					duration: 30000,
					position: 'top-center',
					icon: getNotificationIcons(jsonData.type),
				});
			};

			eventSource.onerror = function (error) {
				console.error('EventSource failed:', error);
				eventSource.close();
			};

			return () => {
				eventSource.close();
			};
		}

	}, [user]);


	const test = () => {
		var jsonData = {
			type: "auction_winner",
			message: "축하합니다!! 낙찰되었어영!!",
			data: {
				thumbnailUrl: 'https://funxtion-image.s3.amazonaws.com/5b65b0de-d7c1-4293-8b73-2567f1e4d61f.jpg',
				productId: 7,
			}
		}

		jsonData = {
			type: "auction_miss",
			message: "이런, 경매 낙찰 기회를 뺏겼어요!!",
			data: {
				thumbnailUrl: 'https://funxtion-image.s3.amazonaws.com/5b65b0de-d7c1-4293-8b73-2567f1e4d61f.jpg',
				productId: 7,
			}
		}

		toast((t) => (
			<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				{/* <img src={jsonData.data.thumbnailUrl} style={{ width: '25px', height: '25px', borderRadius: '50%' }} alt="" /> */}
				<p>
					{jsonData.message}
					<Link href={`/products/${jsonData.data.productId}`} style={{ color: 'dodgerblue' }}>이동</Link>
				</p>
				<div onClick={() => toast.dismiss(t.id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><BsX /></div>
			</div>
		), {
			duration: 10000,
			position: 'top-center',
			// icon: getNotificationIcons(jsonData.type),
			icon: <img src={jsonData.data.thumbnailUrl} style={{ width: '35px', height: '35px', borderRadius: '50%' }} alt="" />
		});
	}

	return (
		<nav className={styles.navigation}>
			{modal.payment && <PaymentModal clickModal={() => toggleModal('payment')} />}
			{showModalLogout && <LogoutModal clickModal={onClickLogout} logout={logout} />}
			<div className={styles.left}>
				<div className={styles.categoryIcon} onMouseEnter={() => handleShowCategory(true, false)} onMouseLeave={() => handleShowCategory(false, true)}>
					<span className={showCategoryList ? 'active' : ''}><BsList /></span>
					<CategoryList showCategoryList={showCategoryList} handleShowCategory={handleShowCategory} />
				</div>
				<ul className={styles.list}>
					<li className={styles.tab}>
						<Link href="/search">🎁 상품 둘러보기</Link>
					</li>
					{/* <li className={styles.tab}>
						<Link href="/search">상품 둘러보기</Link>
					</li>
					<li className={styles.tab}>
						<Link href="/search">무료나눔</Link>
					</li> */}
				</ul>
			</div>
			<ul className={styles.right}>
				{
					!user.id ?
						<>
							<li><Link href="/auth/login">로그인</Link></li>
							<li><Link href="/auth/join">회원가입</Link></li>
							<li onClick={test}>테스트</li>
						</>
						: <>
							<li className={styles.userInfoContainer}>
								<img className={styles.profileImg} src={user.profileImageUrl} alt="" />
								{user.nickname || user.email}
							</li>
							<li className={styles.userInfoContainer}>
								🅿️ <span style={{ fontSize: '0.9rem' }}>{numberFormatter(user.point)}</span>
								<span className={styles.paymentBtn} onClick={() => showModal('payment')} >충전</span>
							</li>
							<li className={styles.logoutContainer} onClick={onClickLogout}><Link href="">로그아웃</Link></li>
						</>
				}
			</ul>
		</nav>
	)
}
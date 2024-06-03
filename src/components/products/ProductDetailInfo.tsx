"use client"
import { BsAlarmFill, BsEyeFill, BsFillHeartFill, BsHeart, BsHeartFill, BsRobot, BsShare } from "react-icons/bs";
import { scrollToTop, elapsedTime, dateFormatterYYYYMMDDHHmm, numberFormatter, copyClipboard } from "@/utils/common";
import { getCategoryNameKR, getProductCategoryNameKR, getProductQualityNameKR } from "@/utils/product";
import styles from "./ProductDetailInfo.module.css"
import CardLabel from "./ProductCard/CardLabel";
import { useState, useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Link from "next/link";
import BidModal from "../modal/BidModal";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import PointNotEnoughModal from "../modal/PointNotEnoughModal";
import BidHistoryModal from "../modal/BidHistoryModal";
import ProductReportModal from "../modal/ProductReportModal";
import AuctionWinnerModal from "../modal/AuctionWinnerModal";
import Confetti from 'react-confetti'
import useUserInfo from "@/hooks/useUserInfo";
import _ from "lodash";

export default function ProductDetailInfo({ id }: { id: string }) {
	const [productDetail, setProductDetail] = useState({
		id: null,
		categoryId: '',
		coolPrice: 0,
		createDate: '',
		currentPrice: 0,
		endTime: '',
		favorite: false,
		favorites: 0,
		location: '',
		productDesc: '',
		productTitle: '',
		productPrice: 0,
		qualityTypeId: '',
		salesTypeId: '',
		statusTypeId: '',
		updateDate: '',
		views: 0,
		bids: [],
		images: [],
		seller: {
			id: '',
			profileImageUrl: '',
			nickname: '',
			intro: '',
		}
	});
	const { seller, bids } = productDetail;
	const [modal, setModal] = useState({
		bid: false,
		point: false,
		history: false,
		historyMy: false,
		report: false,
		winner: false,
	});

	const router = useRouter();
	const userInfo = useRecoilValue(userInfoState);
	const LOGIN_URL = "/auth/login";
	const [showAnimation, setShowAnimation] = useState(false);
	const isSeller = userInfo.id === productDetail.seller.id; // 판매자 여부
	const { user, getUserDetail } = useUserInfo();


	const toggleModal = (name: string) => {
		if ((name === 'bid' || name === 'report') && !userInfo.id) {
			router.push(LOGIN_URL);
		}

		setModal({
			...modal,
			[name]: !modal[name],
		});
		// console.log(modal)
	}


	// 채팅방 추가 or 이미 존재할 경우 해당 상품으로 변경
	const updateChatRoom = async () => {
		const res = await api.post(`/chats`, { customerId: userInfo.id, storeId: productDetail.seller.id, productId: productDetail.id });
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			// console.log(data);
			toast.success(msg || `채팅방 추가 | 변경 성공`);
			if (data) {
				router.push("/chats/" + data);
			}
		}
	}

	const clickChatting = () => {
		if (!userInfo.id) {
			router.push(LOGIN_URL);
		} else {
			updateChatRoom();
		}
	}

	const clickBid = () => {
		if (!userInfo.id) {
			router.push(LOGIN_URL);
		} else {
			toggleModal('bid');
		}
	}

	const clickFastPurchase = () => {
		if (!userInfo.id) {
			router.push(LOGIN_URL);
		} else {
			createNewBid(productDetail.coolPrice);
		}
	}

	useEffect(() => {
		scrollToTop();
		init();
	}, [])

	const init = async () => {
		const result = await api.get(`/products/${id}?u=${userInfo.id}`);
		const { data: { resultCode, msg, data } } = result;
		// console.log(response);
		if (resultCode === '200') {
			setProductDetail(data);
			setIsFollow(data.follow);
		}
	}

	const images = productDetail.images.map((img: any) => img.imageUrl);


	const checkUserHasMoney = async (point: number) => {
		const response = await api.post(`/members/has-money`, {
			userId: userInfo.id,
			point,
		});
		return response.data.data;
	}

	const createNewBid = async (bidPrice: number, isFirst: boolean) => {
		if (!bidPrice) {
			toast.error("입찰가를 입력해주세요!");
			return;
		}

		const now = new Date().getTime();
		if (productDetail.salesTypeId === "SA01" &&
			((isFirst && (bidPrice < productDetail.productPrice)) || (!isFirst && bidPrice <= productDetail.currentPrice))) {
			toast.error("입찰할 수 없는 금액입니다!");
			return;
		} else if (productDetail.salesTypeId === "SA02" &&
			((isFirst && (bidPrice < productDetail.productPrice)) || (!isFirst && bidPrice <= productDetail.productPrice))) {
			toast.error("입찰할 수 없는 금액입니다!");
			return;
		} else if ((productDetail.salesTypeId === "SA01" || productDetail.salesTypeId === "SA02") && now >= new Date(productDetail.endTime).getTime()) { // 경매 종료일 체크
			toast.error("경매가 종료되어 입찰이 불가합니다!");
			return;
		}

		const hasMoney = await checkUserHasMoney(bidPrice);
		if (!hasMoney) {
			setModal({
				...modal,
				bid: false,
				point: true,
			});

			return;
		} else {
			const response = await api.post(`/products/bid`, {
				bidderId: userInfo.id,
				productId: id,
				bidPrice,
			});
			const { data: { resultCode, msg, data } } = response;
			if (resultCode === "200") {
				toast.success(msg);
				init();
				getUserDetail();

				if (data.winnerYn) { // 낙찰자로 정해졌으면
					callWinnerAnimation()
					setModal({ ...modal, bid: false, winner: true });
				} else {
					toggleModal('bid');
				}

			} else {
				toast.error(msg);
				toggleModal('bid');
			}

		}
	}

	const callWinnerAnimation = () => {
		setShowAnimation(true);
		setTimeout(() => {
			setShowAnimation(false);
		}, 10000)
	}

	const onClickLike = async () => {
		const result = await api.put("/products/favorite", {
			userId: userInfo.id,
			productId: id,
		});
		// console.log(result);
		if (result.data.resultCode === "200") {
			init();
		}
	}

	const handleReport = async (code: string) => {
		if (!code) {
			return;
		}

		const result = await api.post("/products/reports", {
			userId: userInfo.id,
			productId: productDetail.id,
			reportTypeCode: code,
		});
		const { data: { resultCode, msg } } = result;
		if (resultCode === '200') {
			toast.success(msg || '신고 접수 성공!');
		} else {
			toast.error(msg || '신고 접수 실패!');
		}
		toggleModal('report');
	}

	const changeFollowState = async (toId) => {
		const res = await api.post(`/follow/follower`, { toId: toId, fromId: userInfo.id });
		const { data: { resultCode, msg } } = res;
		if (resultCode === '200') {

		}
	};

	const [isFollow, setIsFollow] = useState(false);

	return (
		<section className={styles.section} >
			{showAnimation && <Confetti />}
			{modal.winner && <AuctionWinnerModal clickModal={() => toggleModal('winner')} />}
			{modal.report && <ProductReportModal clickModal={() => toggleModal('report')} ok={handleReport} />}
			{modal.history && <BidHistoryModal clickModal={() => toggleModal('history')} bidList={[...bids]} />}
			{modal.historyMy && <BidHistoryModal clickModal={() => toggleModal('historyMy')} bidList={_.filter(bids, { bidderId: user.id })} />}
			{modal.point && <PointNotEnoughModal clickModal={() => toggleModal('point')} />}
			{modal.bid && <BidModal
				clickModal={() => toggleModal('bid')}
				handleOk={createNewBid}
				productDetail={productDetail}
			/>}
			{
				productDetail.statusTypeId && productDetail.statusTypeId !== 'ST01' &&
				<div className={styles.alert}>
					😅 {productDetail.statusTypeId === "ST02" && <span>판매 완료된 상품입니다.</span>}
					{productDetail.statusTypeId === "ST03" && <span>판매 대기중인 상품입니다.</span>}
					{productDetail.statusTypeId === "ST04" && <span>해당 상품은 거래가 진행중인 상품입니다. 입찰 또는 바로구매가 제한됩니다.</span>}
					{productDetail.statusTypeId === "ST05" && <span>삭제된 상품입니다.</span>}
				</div>
			}
			<div className={styles.sectionTop}>
				<div className={styles.imgContainer}>
					{images && images.length > 0 ? <SimpleImageSlider
						width={500}
						height={500}
						images={images}
						showBullets={true}
						showNavs={true}
						bgColor={'#ffffff'}
					/> : <img src="https://funxtion-image.s3.amazonaws.com/funxtion/no-image.jpg" />}
				</div>
				<div className={styles.contentContainer}>
					<h2 className={styles.productTitle}>{productDetail.productTitle} </h2>
					<div className={styles.etcRow}>
						<ul className={styles.etcText}>
							<li><BsAlarmFill />&nbsp;{elapsedTime(productDetail.createDate) || "42분 전"}</li>
							<li><BsEyeFill />&nbsp;{productDetail.views}</li>
							<li><BsFillHeartFill />&nbsp;{productDetail.favorites || '0'}</li>
							{productDetail.salesTypeId !== "SA03" ? <>
								<CardLabel label="경매" backgroundColor="#0057ff" color="white" /> {productDetail.salesTypeId == "SA02" && <CardLabel label="블라인드" backgroundColor="#9e04e0" color="white" />}
							</> : <CardLabel label="대화거래" color="black" />
							}
						</ul>
						<ul className={styles.etcIcon}>
							{(!isSeller && userInfo.id) && <li onClick={onClickLike}>{productDetail.favorite ? <BsHeartFill color="red" /> : <BsHeart />}</li>}
							<li onClick={() => copyClipboard(location.href)}><BsShare /></li>
							{(!isSeller && userInfo.id) && <li onClick={() => toggleModal('report')}><BsRobot /></li>}
						</ul>
					</div>
					<h3 className={styles.priceTxt}>
						{
							productDetail.salesTypeId !== "SA02" ?
								`${numberFormatter(productDetail.currentPrice)}원` :
								productDetail.currentPrice === productDetail.productPrice ? `${numberFormatter(productDetail.currentPrice)}원` : '🤫 ???'
						}
					</h3>
					{
						productDetail.salesTypeId !== "SA03" && <div className={styles.infoContainer}>
							<ul className={styles.infoList}>
								<li className={styles.infoCol}>
									<div className={styles.label}>입찰</div>
									<div className={styles.content}>{numberFormatter(productDetail.bids.length) || '0'}회&nbsp;&nbsp;
										{productDetail.salesTypeId === "SA01" && <span className={styles.bidCountText} onClick={() => toggleModal('history')}>입찰내역</span>}
										{productDetail.salesTypeId === "SA02" && user.id && <span className={styles.bidCountText} onClick={() => toggleModal('historyMy')}>입찰내역</span>}
									</div>
								</li>
								<li className={styles.infoCol}>
									<div className={styles.label}>시작가</div>
									<div className={styles.content}>{numberFormatter(productDetail.productPrice) || '0'}원</div>
								</li>
								<li className={styles.infoCol}>
									<div className={styles.label}>경매종료</div>
									<div className={styles.content}>{dateFormatterYYYYMMDDHHmm(productDetail.endTime)}</div>
								</li>
								{
									productDetail.salesTypeId === "SA01" && productDetail.coolPrice && <li className={styles.infoCol}>
										<div className={styles.label}>즉구가</div>
										<div className={styles.content}>{numberFormatter(productDetail.coolPrice) || '0'}원</div>
									</li>
								}
							</ul>
						</div>
					}
					<div className={styles.infoContainer}>
						<ul className={styles.infoList}>
							<li className={styles.infoCol}>
								<div className={styles.label}>상품상태</div>
								<div className={styles.content}>{getProductQualityNameKR(productDetail.qualityTypeId)}</div>
							</li>
							<li className={styles.infoCol}>
								<div className={styles.label}>거래 희망 지역</div>
								<div className={styles.content}>{productDetail.location || '전국'}</div>
							</li>
							<li className={styles.infoCol}>
								<div className={styles.label}>카테고리</div>
								<div className={styles.content}>{getCategoryNameKR(productDetail.categoryId)}</div>
							</li>
						</ul>
					</div>
					{
						!isSeller &&
						<div className={styles.btnContainer}>
							<button className={`${styles.btnChat} ${productDetail.statusTypeId !== 'ST01' && 'disabled'}`} onClick={clickChatting} disabled={productDetail.statusTypeId !== 'ST01'}>💬1:1채팅</button>
							{productDetail.salesTypeId !== "SA03" && <button className={`${styles.btnBid} ${productDetail.statusTypeId !== 'ST01' && 'disabled'}`} onClick={clickBid} disabled={productDetail.statusTypeId !== 'ST01'}>✋입찰</button>}
							{productDetail.salesTypeId === "SA01" && productDetail.coolPrice && <button className={`${styles.btnCool} ${productDetail.statusTypeId !== 'ST01' && 'disabled'}`} onClick={clickFastPurchase} disabled={productDetail.statusTypeId !== 'ST01'}>⚡즉시 낙찰</button>}
						</div>
					}
				</div>
			</div>
			<div className={styles.sectionBottom}>
				<div>
					<h3>상품 정보</h3>
					<p className={styles.productDescription}>
						{productDetail.productDesc}
					</p>
				</div>
				<div>
					<h3>판매자 정보</h3>
					<Link href={`${isSeller ? `/shop/${seller.id}/products` : `/shop/${seller.id}`}`}>
						<div className={styles.userInfo}>
							<h4>{seller.nickname}</h4>
							<img src={seller.profileImageUrl} alt="유저 이미지" />
						</div>
						<div className={styles.userIntro}>
							{seller.intro}
						</div>
					</Link>
					{!isSeller && userInfo.id && (
						<button
							className={isFollow ? styles.followedBtn : styles.followBtn}
							onClick={() => { setIsFollow(!isFollow); changeFollowState(seller.id); }}>
							{isFollow ? '팔로우 해제' : '+ 팔로우'}
						</button>
					)}
				</div>
			</div>
		</section >
	)

}
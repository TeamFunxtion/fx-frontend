"use client"
import { BsChatDots, BsHeart, BsLightningChargeFill, BsPersonRaisedHand, BsRobot, BsShare } from "react-icons/bs";
import { scrollToTop, elapsedTime, dateFormatterYYYYMMDDHHmm, numberFormatter } from "@/utils/common";
import { getProductQualityNameKR } from "@/utils/product";
import styles from "./ProductDetailInfo.module.css"
import CardLabel from "./ProductCard/CardLabel";

export default function ProductDetailInfo({ productDetail }) {
	scrollToTop();

	return (
		<section className={styles.section} >
			<div className={styles.sectionTop}>
				<div className={styles.imgContainer}>
					<img src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" alt="" />
					{/* <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="" /> */}
				</div>
				<div className={styles.contentContainer}>
					<h2 className={styles.productTitle}>{productDetail.productTitle} </h2>
					<div className={styles.etcRow}>
						<ul className={styles.etcText}>
							<li>{elapsedTime(productDetail.createDate) || "42분 전"}</li>
							<li>조회수 {productDetail.views}</li>
							<li>관심 {productDetail.interests || '0'}</li>
							{productDetail.salesTypeId !== "SA03" ? <>
								<CardLabel label="경매" backgroundColor="dodgerblue" color="white" /> {productDetail.salesTypeId == "SA02" && <CardLabel label="블라인드" backgroundColor="black" color="white" />}
							</> : <CardLabel label="대화 거래" color="black" />
							}
						</ul>
						<ul className={styles.etcIcon}>
							<li><BsHeart /></li>
							<li><BsShare /></li>
							<li><BsRobot /></li>
						</ul>
					</div>
					<h3 className={styles.priceTxt}>{numberFormatter(productDetail.currentPrice)}원</h3>

					{
						productDetail.salesTypeId !== "SA03" && <div className={styles.infoContainer}>
							<ul className={styles.infoList}>
								<li className={styles.infoCol}>
									<div className={styles.label}>입찰</div>
									<div className={styles.content}>{numberFormatter(productDetail.bidCount) || '0'}명</div>
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
										<div className={styles.label}>즉시구매</div>
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
								<div className={styles.content}>{productDetail.location || "서울시 강남구"}</div>
							</li>
						</ul>
					</div>
					<div className={styles.btnContainer}>
						<button className={styles.btnChat}><BsChatDots />&nbsp;1:1채팅</button>
						{productDetail.salesTypeId !== "SA03" && <button className={styles.btnBid}><BsPersonRaisedHand />&nbsp;입찰</button>}
						{productDetail.salesTypeId === "SA01" && productDetail.coolPrice && <button className={styles.btnCool}><BsLightningChargeFill />즉시구매</button>}
					</div>
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
					<div className={styles.userInfo}>
						<h4>인천핵주먹류연우</h4>
						<img src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" alt="" />
					</div>
					<div className={styles.userIntro}>
						저는 인천의자랑 핵주먹 류연우입니다.저는 인천의자랑 핵주먹 류연우입니다.저는 인천의자랑 핵주먹 류연우입니다.저는 인천의자랑 핵주먹 류연우입니다.
					</div>
					<button className={styles.followBtn}>+ 팔로우</button>
				</div>
			</div>
		</section>
	)

}
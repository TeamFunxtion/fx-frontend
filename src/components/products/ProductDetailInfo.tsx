"use client"
import { BsChatDots, BsHeart, BsLightningChargeFill, BsPersonRaisedHand, BsRobot, BsShare } from "react-icons/bs";
import { scrollToTop, elapsedTime, dateFormatterYYYYMMDDHHmm, numberFormatter } from "@/utils/common";
import { getProductQualityNameKR } from "@/utils/product";
import styles from "./ProductDetailInfo.module.css"
import CardLabel from "./ProductCard/CardLabel";
import { useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Link from "next/link";

export default function ProductDetailInfo({ productDetail }) {
	const { seller } = productDetail;

	useEffect(() => {
		scrollToTop();
	}, [])

	const images = productDetail.images.map((img: any) => img.imageUrl);

	return (
		<section className={styles.section} >
			<div className={styles.sectionTop}>
				<div className={styles.imgContainer}>
					{images && images.length > 0 ? <SimpleImageSlider
						width={500}
						height={500}
						images={images}
						showBullets={true}
						showNavs={true}
					/> : <img src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" />}
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
					<h3 className={styles.priceTxt}>{productDetail.salesTypeId !== "SA02" ? `${numberFormatter(productDetail.currentPrice)}원` : '?'}
					</h3>
					{
						productDetail.salesTypeId !== "SA03" && <div className={styles.infoContainer}>
							<ul className={styles.infoList}>
								<li className={styles.infoCol}>
									<div className={styles.label}>입찰</div>
									<div className={styles.content}>{numberFormatter(productDetail.bids.length) || '0'}명</div>
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
								<div className={styles.content}>{productDetail.location || "서울시 강남구"}</div>
							</li>
						</ul>
					</div>
					<div className={styles.btnContainer}>
						<button className={styles.btnChat}><BsChatDots />&nbsp;1:1채팅</button>
						{productDetail.salesTypeId !== "SA03" && <button className={styles.btnBid}><BsPersonRaisedHand />&nbsp;입찰</button>}
						{productDetail.salesTypeId === "SA01" && productDetail.coolPrice && <button className={styles.btnCool}><BsLightningChargeFill />바로 구매</button>}
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
					<Link href={`/shop/${seller.id}`}>
						<div className={styles.userInfo}>
							<h4>{seller.nickname}</h4>
							<img src={seller.profileImageUrl} alt="유저 이미지" />
						</div>
						<div className={styles.userIntro}>
							{seller.intro}
						</div>
					</Link>
					<button className={styles.followBtn}>+ 팔로우</button>
				</div>
			</div>
		</section>
	)

}
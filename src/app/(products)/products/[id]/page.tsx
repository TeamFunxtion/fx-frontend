import { BsChatDots, BsHeart, BsLightningChargeFill, BsPersonRaisedHand, BsRobot, BsShare } from "react-icons/bs";
import styles from "./page.module.css";
import { API_URL } from "@/app/constants";
import { elapsedTime, dateFormatterYYYYMMDDHHmm, numberFormatter } from "@/utils/common";
import { getProductQualityNameKR } from "@/utils/product";

interface IParams {
	params: { id: string }
}

export async function generateMetadata({ params: { id } }: IParams) {
	const { data } = await getProductDetail(id);
	return {
		title: data.productTitle
	}
}

export async function getProductDetail(id: string) {
	// await new Promise((resolve) => setTimeout(resolve, 5000));
	// throw new Error("Oops...");
	const response = await fetch(`${API_URL}/products/${id}`);
	return response.json();
}

export default async function ProductDetailPage({
	params: { id }
}: IParams) {
	console.log(id);

	const { data } = await getProductDetail(id);
	const productDetail = data;

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
						</ul>
						<ul className={styles.etcIcon}>
							<li><BsHeart /></li>
							<li><BsShare /></li>
							<li><BsRobot /></li>
						</ul>
					</div>
					<h3 className={styles.priceTxt}>{numberFormatter(productDetail.currentPrice)}원</h3>
					<div className={styles.infoContainer}>
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
								productDetail.coolPrice && <li className={styles.infoCol}>
									<div className={styles.label}>즉시구매</div>
									<div className={styles.content}>{numberFormatter(productDetail.coolPrice) || '0'}원</div>
								</li>
							}
						</ul>
					</div>
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
						<button className={styles.btnBid}><BsPersonRaisedHand />&nbsp;입찰</button>
						<button className={styles.btnCool}><BsLightningChargeFill />즉시구매</button>
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

const itemData = [
	// {
	// 	img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
	// 	title: 'Breakfast',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
	// 	title: 'Burger',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
	// 	title: 'Camera',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
	// 	title: 'Coffee',
	// },
	// {
	// 	img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
	// 	title: 'Hats',
	// },
	{
		img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
		title: 'Honey',
	},
	{
		img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
		title: 'Basketball',
	},
	{
		img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
		title: 'Fern',
	},
	{
		img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
		title: 'Mushrooms',
	},
	{
		img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
		title: 'Tomato basil',
	},
	{
		img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
		title: 'Sea star',
	},
	{
		img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
		title: 'Bike',
	},
];
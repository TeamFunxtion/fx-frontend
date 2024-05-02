import { BsChat, BsChatDots, BsHeart, BsLightningChargeFill, BsPersonRaisedHand, BsRobot, BsShare } from "react-icons/bs";
import styles from "./page.module.css";

export default function ProductDetailPage() {
	return (
		<section className={styles.section}>
			<div className={styles.sectionTop}>
				<div className={styles.imgContainer}>
					<img src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" alt="" />
					{/* <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="" /> */}
				</div>
				<div className={styles.contentContainer}>
					<h2 className={styles.productTitle}>EENK 잉크 | SITA 플로랄 자카드 니트 베스트</h2>
					<div className={styles.etcRow}>
						<ul className={styles.etcText}>
							<li>42분 전</li>
							<li>조회수 324</li>
							<li>관심 52</li>
						</ul>
						<ul className={styles.etcIcon}>
							<li><BsHeart /></li>
							<li><BsShare /></li>
							<li><BsRobot /></li>
						</ul>
					</div>
					<h3 className={styles.priceTxt}>120,000원</h3>
					<div className={styles.infoContainer}>
						<ul className={styles.infoList}>
							<li className={styles.infoCol}>
								<div className={styles.label}>시작가</div>
								<div className={styles.content}>10,000원</div>
							</li>
							<li className={styles.infoCol}>
								<div className={styles.label}>입찰</div>
								<div className={styles.content}>32명</div>
							</li>
							<li className={styles.infoCol}>
								<div className={styles.label}>즉시구매</div>
								<div className={styles.content}>10,000원</div>
							</li>
							<li className={styles.infoCol}>
								<div className={styles.label}>경매종료</div>
								<div className={styles.content}>24.06.03 18:30</div>
							</li>
						</ul>
					</div>
					<div className={styles.infoContainer}>
						<ul className={styles.infoList}>
							<li className={styles.infoCol}>
								<div className={styles.label}>상품상태</div>
								<div className={styles.content}>중고</div>
							</li>
							<li className={styles.infoCol}>
								<div className={styles.label}>거래 희망 지역</div>
								<div className={styles.content}>서울시 강남구</div>
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
						👆중고나라 앱이 있다는 걸 아시나요? 상단 중고나라 앱 다운받기 클릭!
						👆앱에서 구매를 원하는 댓글이 달릴 수도 있어요! 더보기 클릭하고 미리 알아두기!
						───────────────────
						※ 유튜브, 블로그, 인스타그램 등 상품 정보 제공 목적 링크 가능(외부 거래를 유도하는 링크 제외)
						※ 등록한 게시글이 회원의 신고를 받거나 이상거래로 모니터링 될 경우 중고나라 사기통합조회 DB로 수집/활용될 수 있습니다.
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
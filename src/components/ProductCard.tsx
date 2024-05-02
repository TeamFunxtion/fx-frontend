import styles from "@/styles/ProductCard.module.css"

export default function ProductCard() {
	return (
		<>
			<li className={styles.productCard}>
				<div className={styles.cardThumbnail}>
					<img src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" alt="" />
				</div>
				<div className={styles.cardBody}>
					<h3 className={styles.productTitle}>EENK 잉크 | SITA 플로랄 자카드 니트 베스트</h3>
					{/* s: 경매상품 정보 */}
					<ul className="">
						<li className={styles.textRow}>
							<div className="rowLabel">현재가</div>
							<div className="rowContent">396,000원</div>
						</li>
						<li className={styles.textRow}>
							<div className="rowLabel">즉시구매</div>
							<div className="rowContent">726,000원</div>
						</li>
						<li className={styles.textRow}>
							<div className="rowLabel">입찰자</div>
							<div className="rowContent">58</div>
						</li>
						<li className={styles.textRow}>
							<div className="rowLabel">경매종료</div>
							<div className="rowContent">24.06.03 18:30</div>
						</li>
					</ul>
					{/* e: 경매상품 정보 */}

					{/* s: 일반상품 정보 */}
					{/* <ul className="">
						<li className={styles.textRow}>
							<div className="rowLabel">판매가</div>
							<div className="rowContent">396,000원</div>
						</li>
					</ul> */}
					{/* e: 일반상품 정보 */}
				</div>
			</li>
			{/* <li className={styles.productCard}>
				<img src="https://img.khan.co.kr/news/2013/10/24/l_2013102401003945300306915.jpg" alt="" />
			</li> */}
		</>
	)
}
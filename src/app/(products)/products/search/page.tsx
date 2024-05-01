import styles from "./page.module.css";

export default function ProductsSearchPage() {
	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2>상품 검색 결과</h2>
				{/* <button>초기화</button> */}
				<ul>
					<li>
						<div className={styles.rowLabel}>판매 방법</div>
						<div className={styles.rowContent}>
							<span>오픈 경매</span>
							<span>블라인드 경매</span>
							<span>일반 판매</span>
						</div>
					</li>
					<li>
						<div className={styles.rowLabel}>카테고리</div>
						<div className={styles.rowContent}>
							<span>카테고리</span>
							<span>카테고리</span>
							<span>카테고리</span>
							<span>카테고리</span>
							<span>카테고리</span>
							<span>카테고리</span>
							<span>카테고리</span>
							<span>카테고리</span>
						</div>
					</li>
					<li>
						<div className={styles.rowLabel}>가격</div>
						<div className={styles.rowContent}>
							<input type="text" placeholder="최소 가격" />
							&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
							<input type="text" placeholder="최대 가격" />
							&nbsp;&nbsp;
							<button>적용</button>
						</div>
					</li>
					<li>
						<div className={styles.rowLabel}>중고</div>
						<div className={styles.rowContent}>
							<span>중고</span>
							<span>새 상품</span>
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}
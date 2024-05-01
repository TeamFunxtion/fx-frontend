import { BsCardImage, BsX } from "react-icons/bs"
import styles from "./ProductsNewForm.module.css"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"

export default function ProductsNewForm() {

	return (
		<section className={styles.section}>
			<ul className={styles.list}>
				<h2 className={styles.listTitle}>상품 정보</h2>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>상품 이미지</div>
					<div className={styles.rowContent}>
						<ul className={styles.images}>
							<li><BsCardImage /><br />이미지 업로드</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
							<li className={styles.imgBox}>
								<img className={styles.img} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" />
								<div className={styles.imgDelBtn}>
									<BsX />
								</div>
							</li>
						</ul>
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>상품명</div>
					<div className={styles.rowContent}>
						<input className={styles.input} type="text" placeholder="상품명" />
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>카테고리</div>
					<div className={styles.rowContent}>
						<ul className={styles.categoryList}>
							<li className={styles.categoryItem}>카테고리</li>
							<li className={styles.categoryItem}>카테고리</li>
							<li className={styles.categoryItem}>카테고리</li>
							<li className={styles.categoryItem}>카테고리</li>
							<li className={styles.categoryItem}>카테고리</li>
							<li className={styles.categoryItem}>카테고리</li>
							<li className={styles.categoryItem}>카테고리</li>
							<li className={styles.categoryItem}>카테고리</li>
						</ul>
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>가격</div>
					<div className={styles.rowContent}>
						<input className={styles.input} type="text" placeholder="가격" />
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>설명</div>
					<div className={styles.rowContent}>
						<textarea className={styles.textArea} placeholder="브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요." />
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>상품 상태</div>
					<div className={styles.rowContent}>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
						>
							<FormControlLabel value="0" control={<Radio />} label="중고" />
							<FormControlLabel value="1" control={<Radio />} label="새 상품" />
						</RadioGroup>
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>거래 희망 지역</div>
					<div className={styles.rowContent}>
						<input className={styles.input} type="text" placeholder="거래 희망 지역" />
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>판매 방법</div>
					<div className={styles.rowContent}>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
						>
							<FormControlLabel value="0" control={<Radio />} label="일반 경매" />
							<FormControlLabel value="1" control={<Radio />} label="블라인드 경매" />
							<FormControlLabel value="2" control={<Radio />} label="구매자와 대화하여 거래" />
						</RadioGroup>
					</div>
				</li>
			</ul>

			{ /* 경매 정보 */}
			<ul className={styles.list}>
				<h2 className={styles.listTitle}>경매 정보</h2>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>즉시 구매가</div>
					<div className={styles.rowContent}>
						<input className={styles.input} type="text" placeholder="즉시 구매가" />
					</div>
				</li>
				<li className={styles.listRow}>
					<div className={styles.rowLabel}>경매 종료일</div>
					<div className={styles.rowContent}>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
						>
							<FormControlLabel value="1" control={<Radio />} label="1일" />
							<FormControlLabel value="2" control={<Radio />} label="2일" />
							<FormControlLabel value="3" control={<Radio />} label="3일" />
						</RadioGroup>
					</div>
				</li>
			</ul>
			<footer className={styles.footer}>
				<button>등록하기</button>
			</footer>
		</section>
	)
}
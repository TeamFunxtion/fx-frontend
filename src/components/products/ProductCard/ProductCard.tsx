"use client"
import styles from "./ProductCard.module.css"
import { dateFormatterYYYYMMDDHHmm, numberFormatter } from "@/utils/common"
import { useRouter } from "next/navigation"
import CardLabel from "./CardLabel";

export default function ProductCard({ product }) {
	const router = useRouter();

	const onClickCard = () => {
		router.push(`/products/${product.id}`);

	}

	return (
		<li className={styles.productCard} onClick={onClickCard}>
			<div className={styles.cardThumbnail}>
				<img src="https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg" alt="" />
			</div>
			<div className={styles.cardBody}>
				<div>
					{product.salesTypeId !== "SA03" ? <>
						<CardLabel label="경매" backgroundColor="dodgerblue" color="white" /> {product.salesTypeId == "SA02" && <CardLabel label="블라인드" backgroundColor="black" color="white" />}
					</> : <CardLabel label="대화 거래" />
					}
				</div>
				<h3 className={styles.productTitle}>{product.productTitle}</h3>
				{
					product.salesTypeId !== 'SA03' ? <ul className="">
						<li className={styles.textRow}>
							<div className="rowLabel">현재가</div>
							<div className="rowContent">{numberFormatter(product.currentPrice)}원</div>
						</li>
						<li className={styles.textRow}>
							<div className="rowLabel">즉구가</div>
							<div className="rowContent">{product.coolPrice ? `${numberFormatter(product.coolPrice)}원` : '없음'}</div>
						</li>
						<li className={styles.textRow}>
							<div className="rowLabel">입찰자</div>
							<div className="rowContent">{numberFormatter(product.bidCount) || '0'}</div>
						</li>
						<li className={styles.textRow}>
							<div className="rowLabel">경매종료</div>
							<div className="rowContent">{dateFormatterYYYYMMDDHHmm(product.endTime)}</div>
						</li>
					</ul> :
						<ul className="">
							<li className={styles.textRow}>
								<div className="rowLabel">판매가</div>
								<div className="rowContent">{numberFormatter(product.currentPrice)}원</div>
							</li>
						</ul>
				}
			</div>
		</li >
	)
}
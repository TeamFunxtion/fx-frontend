"use client"
import styles from "./ProductCard.module.css"
import { elapsedTime, numberFormatter } from "@/utils/common"
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
						<CardLabel label="경매" backgroundColor="#0057ff" color="white" /> {product.salesTypeId == "SA02" && <CardLabel label="블라인드" backgroundColor="black" color="white" />}
					</> : <CardLabel label="대화 거래" />
					}
				</div>
				<h3 className={styles.productTitle}>{product.productTitle}</h3>
				<div className={styles.footer}>
					<h1>
						{
							product.salesTypeId === 'SA02' ?
								product.currentPrice === product.productPrice ? `${numberFormatter(product.currentPrice)}원` : '🤫 ???' :
								`${numberFormatter(product.currentPrice)}원`
						}
					</h1>
					<p className={styles.createDate}>{elapsedTime(product.createDate)}</p>
				</div>
			</div>
		</li >
	)
}
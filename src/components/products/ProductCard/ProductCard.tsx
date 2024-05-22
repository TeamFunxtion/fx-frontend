"use client"
import styles from "./ProductCard.module.css"
import { elapsedTime, numberFormatter } from "@/utils/common"
import { useRouter } from "next/navigation"
import CardLabel from "./CardLabel";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductCard({ product, hideDeleted }) {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	console.log(product);

	const isDeleted = product && product.statusTypeId === 'ST05';

	const onClickCard = () => {
		if (isDeleted) {
			return;
		} else {
			router.push(`/products/${product.id}`);
		}
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<>
			{
				mounted && <li className={styles.productCard} onClick={onClickCard}>
					{!hideDeleted && isDeleted && <div className={styles.deleted}>삭제됨</div>}
					<div className={styles.cardThumbnail}>
						<Image
							src={`${product.thumbnailUrl || 'https://funxtion-image.s3.amazonaws.com/funxtion/no-image.jpg'}`}
							width={200}
							height={200}
							layout="responsive"
							alt={product.productTitle}
						/>
					</div>
					<div className={styles.cardBody}>
						<div>
							{product.salesTypeId !== "SA03" ? <>
								<CardLabel label="경매" backgroundColor="#0057ff" color="white" /> {product.salesTypeId == "SA02" && <CardLabel label="블라인드" backgroundColor="#9e04e0" color="white" />}
							</> : <CardLabel label="대화거래" />
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
			}
		</>
	)
}
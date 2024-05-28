'use client'
import MyProductsPage from "@/app/(shop)/shop/[id]/products/page"
import FxTab from "../FxTab"
import { useState } from "react"
import NoResult from "../NoResult"
import MyReviewsPage from "@/app/(shop)/shop/[id]/reviews/page"

const items = [
	{ label: '상품', value: 0 },
	{ label: '팔로우', value: 1 },
	{ label: '팔로잉', value: 2 },
	{ label: '상점후기', value: 3 },
]

export default function ShopVisit({ params }) {
	const [idx, setIdx] = useState(0);

	const onClickTab = (index) => {
		setIdx(index);
	}

	return (
		<div>
			<FxTab items={items} fullWidth={true} onClick={onClickTab} />
			{idx === 0 && <MyProductsPage guest={true} storeId={params.id} />}
			{idx === 1 && <NoResult text="준비중입니다." />}
			{idx === 2 && <NoResult text="준비중입니다." />}
			{idx === 3 && <MyReviewsPage guest={true} storeId={params.id} />}
		</div>
	)
}
'use client'
import FxTab from "../FxTab"

const items = [
	{ label: '상품', value: 0 },
	{ label: '팔로우', value: 1 },
	{ label: '팔로잉', value: 2 },
	{ label: '상점후기', value: 3 },
]

export default function ShopVisit() {
	const onClickTab = (index) => {
	}

	return (
		<div>
			<FxTab items={items} fullWidth={true} onClick={onClickTab} />
		</div>
	)
}
import ShopVisit from "@/components/shop/shop-visit";

export default function ShopPage({ params }: { params: { id: string } }) {
	return (
		<div>
			<ShopVisit params={params} />
		</div>
	)
}
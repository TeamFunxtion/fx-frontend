import { API_URL } from "@/app/constants";
import ProductDetailInfo from "@/components/products/ProductDetailInfo";
import api from "@/utils/api";

interface IParams {
	params: { id: string }
}

export async function generateMetadata({ params: { id } }: IParams) {
	const { data } = await getProductDetail(id);
	return {
		title: data.productTitle
	}
}

export async function getProductDetail(id: string) {
	// await new Promise((resolve) => setTimeout(resolve, 5000));
	// throw new Error("Oops...");
	const response = await fetch(`${API_URL}/products/${id}`, { method: 'GET', cache: 'no-store' });
	return response.json();
}

export function increaseViews(id: string) {
	api.get(`${API_URL}/products/${id}/views`);
}

export default function ProductDetailPage({
	params: { id }
}: IParams) {
	// console.log(id);
	increaseViews(id);
	return (
		<ProductDetailInfo id={id} />
	)
}
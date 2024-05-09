import { API_URL } from "@/app/constants";
import ProductDetailInfo from "@/components/products/ProductDetailInfo";

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

export default async function ProductDetailPage({
	params: { id }
}: IParams) {
	// console.log(id);
	const { data } = await getProductDetail(id);
	const productDetail = data;
	// console.log(productDetail);
	return (
		<ProductDetailInfo productDetail={productDetail} />
	)
}
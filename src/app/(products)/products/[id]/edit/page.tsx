import ProductsNewForm from "@/components/products/ProductsNewForm";
import { getProductDetail } from "../page";

interface IParams {
	params: { id: string }
}

export default async function ProductsEditPage({
	params: { id }
}: IParams) {
	// console.log(id);
	const result = await getProductDetail(id);
	// console.log(result);

	let product = null;
	if (result.resultCode === '200') {
		product = result.data;
	}

	return (
		<ProductsNewForm product={product} />
	)
}
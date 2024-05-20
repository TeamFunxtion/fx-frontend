import ShopMenubar from "@/components/shop/shop-menubar";
import styles from "./layout.module.css";
import ShopInfo from "@/components/shop/shop-info";

export default function ShopLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode;
}>) {
	// console.log(params);

	return (
		<div className={styles.container}>
			<ShopMenubar params={params} />
			<div className={styles.shopMainContainer}>
				<ShopInfo params={params} />
				<div className={styles.shpMainPageBody}>
					{children}
				</div>
			</div>
		</div>
	)
}
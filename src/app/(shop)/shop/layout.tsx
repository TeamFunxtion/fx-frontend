import ShopMenubar from "@/components/shop/shop-menubar";
import styles from "./layout.module.css";
import ShopInfo from "@/components/shop/shop-info";

export default function ShopLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={styles.container}>
			<ShopMenubar />
			<div className={styles.shopMainContainer}>
				<ShopInfo />
				<div className={styles.shpMainPageBody}>
					{children}
				</div>
			</div>
		</div>
	)
}
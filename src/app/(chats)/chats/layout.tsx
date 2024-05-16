import styles from "./layout.module.css"
import Chats from "@/components/chats/Chats";

export default function ChatsLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={styles.rootContainer}>
			<div className={styles.mainContainer}>
				<Chats />
				{children}
			</div>
		</div>
	)
}
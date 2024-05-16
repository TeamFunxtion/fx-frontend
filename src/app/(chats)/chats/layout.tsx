import styles from "./layout.module.css"
import Chats from "@/components/chats/Chats";

export default function ChatsLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={styles.container2}>
			<div className={styles.formContainer}>
				<div className={styles.container}>
					<Chats />
					{children}
				</div>
			</div>
		</div>
	)
}
import styles from "./layout.module.css"
export default function TalksLayOut({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				{children}
			</div>
		</div>
	)
}
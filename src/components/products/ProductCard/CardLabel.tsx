import styles from "./CardLabel.module.css";

export default function CardLabel({ label, backgroundColor, color }: { label: string, backgroundColor: string, color: string }) {
	return (
		<span className={`${styles.labelSpan}`} style={{ color, backgroundColor }}>
			{label === '경매' && <span className={styles.smallText}>🔔</span>}
			{label === '블라인드' && <span className={styles.smallText}>👁️‍🗨️</span>}
			{label === '대화거래' && <span className={styles.smallText}>💬</span>}
			{label}
		</span>
	)
}
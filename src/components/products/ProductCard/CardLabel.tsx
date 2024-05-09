import styles from "./CardLabel.module.css";

export default function CardLabel({ label, backgroundColor, color }) {
	return (
		<span className={`${styles.labelSpan}`} style={{ color, backgroundColor }}>
			{label}
		</span>
	)
}
import React from 'react';
import styles from './SafePayModal.module.css';
export default function SafePayModal({ isModalOpen, onClose, point, ok }) {
	if (!isModalOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<div className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>안전결제</h2>
					<button className={styles.modalCloseBtn} onClick={() => onClose(false)}>X</button>
				</div>
				<div className={styles.modalSeparator}></div>
				<div className={styles.modalBody}>
					{`${point} 포인트가 차감됩니다.`}
				</div>
				<div className={styles.modalSeparator}></div>
				<div className={styles.modalButtons}>
					<button className={styles.modalButtonCancel} onClick={() => onClose(false)}>취소</button>
					<button className={styles.modalButton} onClick={ok}>결제</button>
				</div>
			</div>
		</div>
	);
}
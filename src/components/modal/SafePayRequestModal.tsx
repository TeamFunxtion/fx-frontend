import React from 'react';
import styles from './SafePayModal.module.css';
export default function SafePayRequestModal({ show, onClose, onConfirm }) {
	if (!show) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<div className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>안전거래 요청하기</h2>
					<button className={styles.modalCloseBtn} onClick={onClose}>X</button>
				</div>
				<div className={styles.modalSeparator}></div>
				<div className={styles.modalBody}>
					{`안전거래를 요청하시겠습니까?`}
				</div>
				<div className={styles.modalSeparator}></div>
				<div className={styles.modalButtons}>
					<button className={styles.modalButtonCancel} onClick={onClose}>취소</button>
					<button className={styles.modalButton} onClick={onConfirm}>요청</button>
				</div>
			</div>
		</div>
	);
}
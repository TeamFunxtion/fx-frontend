import React from 'react';
import styles from './SafePayModal.module.css';
import toast from "react-hot-toast";
import api from "@/utils/api";
import useUserInfo from '@/hooks/useUserInfo';
export default function SafePayModal({ isModalOpen, onClose, product, customer, store }) {

	if (!isModalOpen) return null;

	const { getUserDetail } = useUserInfo();

	// 안전결제 status SP03으로 변경
	const updateSafePayStatus = async () => {
		const res = await api.patch(`/safe`, { productId: product.id, sellerId: store.id, buyerId: customer.id });
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || `결제 성공`);
			getUserDetail();
		}
	}

	const handlePayment = () => {
		if (customer.point >= product.currentPrice) {
			updateSafePayStatus();
			alert('결제가 완료되었습니다.');
			onClose(true);
		} else {
			alert('잔액이 부족합니다!');
			onClose(false);
		}

	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<div className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>안전결제</h2>
					<button className={styles.modalCloseBtn} onClick={() => onClose(false)}>X</button>
				</div>
				<div className={styles.modalSeparator}></div>
				<div className={styles.modalBody}>
					{`${product.productPrice} 포인트가 차감됩니다.`}
				</div>
				<div className={styles.modalSeparator}></div>
				<div className={styles.modalButtons}>
					<button className={styles.modalButtonCancel} onClick={() => onClose(false)}>취소</button>
					<button className={styles.modalButton} onClick={handlePayment}>결제</button>
				</div>
			</div>
		</div>
	);
}

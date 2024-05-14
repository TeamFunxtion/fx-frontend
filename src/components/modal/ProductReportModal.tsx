"use client"
import { useRef, useState } from 'react';
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'
import styles from "@/styles/modal/ProductReportModal.module.css"
import api from '@/utils/api';

export default function ProductReportModal({ clickModal, ok }) {

	const [code, setCode] = useState("");

	const list = [
		{ code: 'RE01', name: '광고성 컨텐츠 같아요.' },
		{ code: 'RE02', name: '상품 정보가 부정확해요.' },
		{ code: 'RE03', name: '안전거래를 거부해요.' },
		{ code: 'RE04', name: '판매자가 욕설 또는 비하를 해요.' },
		{ code: 'RE05', name: '사기가 의심돼요.' },
	]

	const onClickConfirm = async () => {
		if (!code) {
			return;
		}
		ok(code);
	}
	return (
		<ModalBox onClick={clickModal}>
			<ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '21rem' }}>
				<ModalHeader>
					<h2>⚖️ 신고하기</h2>
					<h3>신고하려는 이유가 무엇인가요?</h3>
				</ModalHeader>
				<ModalBody>
					<ul className={styles.ul}>
						{
							list && list.map(type => (
								<li className={`${styles.li} ${code === type.code && 'active'}`} onClick={() => setCode(type.code)}>{type.name}</li>
							))
						}
					</ul>
				</ModalBody>
				<ModalFooter>
					<button onClick={clickModal} className='btn-close'>취소</button>
					<button onClick={onClickConfirm} className={`${!code && 'disabled'}`} >신고</button>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
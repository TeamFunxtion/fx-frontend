"use client"
import toast from 'react-hot-toast';
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'
import api from '@/utils/api';
import Script from 'next/script';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/atoms';
import useUserInfo from '@/hooks/useUserInfo';

export default function PaymentModal({ clickModal }) {

	const [amount, setAmount] = useState(10000);
	const userInfo = useRecoilValue(userInfoState);
	const { getUserDetail } = useUserInfo();

	const payment = () => {
		const { IMP } = window;
		IMP.init(process.env.NEXT_PUBLIC_PORTONE_IMP_ID);
		IMP.request_pay(
			{
				pg: "kakaopay",
				pay_method: "card", // 생략가능
				merchant_uid: `mid_${new Date().getTime()}`, // 상점에서 생성한 고유 주문번호
				name: "Funxtion: 포인트 구매",
				amount: Number(amount),
				buyer_email: userInfo.email,
				buyer_name: userInfo.email,
				// buyer_tel: "010-1234-5678",
				// buyer_addr: "서울특별시 강남구 삼성동",
				// buyer_postcode: "123-456",
				// m_redirect_url: 'http://localhost:3000/payment/redirect',
			},
			function (rsp) {
				// console.log(rsp);
				if (rsp.success) {
					verifyPayment(rsp.imp_uid);
					toast.success("결제 성공!");
					clickModal();
				} else {
					toast.error("결제 실패!");
				}
			},
		);
	}

	const verifyPayment = async (imp_uid: string) => {
		const result = await api.get(`/payments/verify/${imp_uid}`);
		// console.log(result);
		getUserDetail();
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (Number.isNaN(value)) return;
		if (value === 0) return;
		setAmount(value);
	}

	const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value === '0') {
			setAmount(0); // 초기화할 수량 입력
		}
	}

	return (
		<ModalBox>
			<Script src="https://cdn.iamport.kr/v1/iamport.js" />
			<ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '21rem' }}>
				<ModalHeader>
					<h2>💳 포인트 충전 결제</h2>
					<h3>안전결제시에 사용되는 결제 수단입니다.</h3>
				</ModalHeader>
				<ModalBody>
					<input type='text' placeholder='결제 금액' value={amount} onChange={onChange} onBlur={onBlur} maxLength={7} />
				</ModalBody>
				<ModalFooter>
					<button onClick={clickModal} className='btn-close'>취소</button>
					<button onClick={payment} >결제하기</button>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
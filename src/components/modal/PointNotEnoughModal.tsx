"use client"
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'
import { useRouter } from 'next/navigation';

export default function PointNotEnoughModal({ clickModal }) {
	const router = useRouter();

	const clickOk = () => {
		router.push("/shop/point");
	}

	return (
		<ModalBox onClick={clickModal}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<h2>💰 포인트가 충분하지 않습니다!</h2>
					<h3>회원님께서 보유중인 포인트가 부족하여 경매에 참여할 수 없습니다.<br />포인트 충전 후 다시 시도해주시기 바랍니다!</h3>
				</ModalHeader>
				<ModalBody>
				</ModalBody>
				<ModalFooter>
					<button className='btn-close' onClick={clickModal}>취소</button>
					<button onClick={clickOk}>충전하러 가기</button>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
"use client"
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'

export default function AuctionWinnerModal({ clickModal }) {
	return (
		<ModalBox onClick={clickModal}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<h2>🎉 낙찰되었습니다!</h2>
					<h3>
						판매자와 대화하여 거래를 진행해주시기 바랍니다!
					</h3>
				</ModalHeader>
				<ModalBody>
				</ModalBody>
				<ModalFooter>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
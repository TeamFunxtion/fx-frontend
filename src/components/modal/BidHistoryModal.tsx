"use client"
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'
import { numberFormatter, dateFormatterYYYYMMDDHHmm } from '@/utils/common'
import styles from "./BidHistoryModal.module.css"

export default function BidHistoryModal({ clickModal, bidList }) {
	console.log(bidList)

	return (
		// 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다.
		<ModalBox onClick={clickModal}>
			<ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '21rem' }}>
				<ModalHeader>
					<h2>⚒️ 입찰내역</h2>
					<h3>
					</h3>
				</ModalHeader>
				<ModalBody style={{ maxHeight: '350px', overflowY: 'scroll' }}>
					<table className={styles.table}>
						<tr className={styles.tr}>
							<th>날짜</th>
							<th>입찰가</th>
						</tr>
						{
							bidList.reverse().map((bid, index) => (
								<tr className={styles.tr}>
									<td>{dateFormatterYYYYMMDDHHmm(bid.createDate)}</td>
									<td>{numberFormatter(bid.bidPrice)}</td>
								</tr>
							))
						}
						{
							bidList.length === 0 && <tr>
								<td colspan="2">조회된 결과가 없습니다.</td>
							</tr>}
					</table>
				</ModalBody>
				<ModalFooter>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
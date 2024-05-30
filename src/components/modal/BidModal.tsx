"use client"
import { useEffect, useState } from 'react'
import { ModalBody, ModalBox, ModalContent, ModalFooter, ModalHeader } from './modalStyle'
import { numberFormatter } from '@/utils/common';

export default function BidModal({ clickModal, handleOk, productDetail }) {
	const [bidPrice, setBidPrice] = useState(0);
	const [ok, setOk] = useState(false);

	const isBlind = productDetail.salesTypeId === "SA02";
	const isFirst = productDetail.bids.length === 0;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (!value && Number.isNaN(value)) {
			return;
		}
		setBidPrice(value);
	}

	const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value === '0') {
			// setBidPrice(1); // 초기화할 수량 입력
		}
	}

	const handleClickBid = () => {
		handleOk(bidPrice, isFirst);
	}

	useEffect(() => {
		if (isFirst) {
			setOk(productDetail.productPrice <= bidPrice);
		} else {
			if (!isBlind) { // 일반경매
				setOk(productDetail.currentPrice + 1000 <= bidPrice);
			} else { // 블라인드
				setOk(productDetail.productPrice + 1000 <= bidPrice);
			}
		}

	}, [bidPrice])
	return (
		// 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다.
		<ModalBox onClick={() => { }}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<h2>✋ 입찰하기</h2>
					<h3>
						{
							!isBlind && <p>
								<b>{numberFormatter(productDetail.currentPrice + (isFirst ? 0 : 1000))}원{!isFirst && '(+1000원)'}</b>부터 입찰이 가능합니다!
							</p>
						}
					</h3>
					<h3 style={{ marginTop: '25px' }}>입력하신 입찰가는 {numberFormatter(bidPrice)}원입니다.</h3>
				</ModalHeader>
				<ModalBody>
					{!isBlind && <p style={{ 'fontSize': '1.2rem' }}>입찰 <span style={{ 'color': ok ? 'dodgerblue' : 'red' }}>{ok ? "가능 😀" : "불가 😐"}</span></p>}
					<input type='text' placeholder='입찰가를 입력하세요!' value={bidPrice} onChange={onChange} onBlur={onBlur} maxLength={7} />
				</ModalBody>
				<ModalFooter>
					<button className='btn-close' onClick={clickModal}>취소</button>
					<button className={!ok ? 'disabled' : ''} disabled={!ok} onClick={handleClickBid}>입찰하기</button>
				</ModalFooter>
			</ModalContent>
		</ModalBox>
	)
}
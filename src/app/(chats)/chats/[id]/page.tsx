"use client"
import styles from "./page.module.css"
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue, useRecoilState } from "recoil";
import toast from "react-hot-toast";
import useWebSocket from 'react-use-websocket';
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { chatState } from "@/store/atoms";
import SafePayModal from "@/components/modal/SafePayModal";
import useUserInfo from '@/hooks/useUserInfo';
import { API_URL } from "@/app/constants";

export default function User() {
	const { getUserDetail } = useUserInfo();
	const [chats, setChats] = useRecoilState(chatState);

	const id = usePathname().substring(7);
	const userInfoValue = useRecoilValue(userInfoState);
	const [chat, setChat] = useState('');
	const userId = userInfoValue.id;
	const [safePay, setSafePay] = useState(false);
	const [safePaymentInfo, setSafePaymentInfo] = useState(null);

	// DB연동 (해당 채팅방 정보 조회)
	const [chatRoomInfo, setChatRoomInfo] = useState(null);
	const getChatRoomInfo = async () => {
		const res = await api.get(`chats/${id}?id=${id}`)
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {

			setChatRoomInfo(data);
			toast.success(msg || `${id}방 조회 성공!`);

			if (data != null) {
				getSafePaymentInfo(data);
			}

		}
	}

	// DB연동 (채팅 읽음 처리)
	const updateMsg = async () => {
		const res = await api.patch(`chats/${id}/messages`, { userId: userId, roomId: id });
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || `${id}방 채팅 읽기 완료!`);
		}
	}

	let today = new Date();
	const insertMsg = (chat, safety, safePayAccept, safeRefuse) => {

		sendMessage(JSON.stringify({
			type: 'message',
			roomNumber: id,
			sessionId: sessionId,
			userId: userId,
			msg: chat,
			productId: chatRoomInfo.product.id,
			sellerId: chatRoomInfo.store.id,
			buyerId: chatRoomInfo.customer.id,
			createDate: today,
			safe: safety,
			safePayAccept: safePayAccept,
			safeRefuse: safeRefuse
		}))

	}


	// 웹소켓 구현 위치
	const { sendMessage, lastMessage } = useWebSocket(`ws://localhost:8090/chat/${id}`);

	const [sessionId, setSessionId] = useState(0);

	const [messageHistory, setMessageHistory] = useState([]);
	let [msgList, setMsgList] = useState([]);
	const [safePayAcception, setSafePayAcception] = useState(0);
	useEffect(() => {
		if (lastMessage !== null) {
			setMessageHistory((prev) => {  //기존 메시지에 데이터를 추가합니다.
				let msg = lastMessage ? lastMessage.data : null;
				if (msg) {
					let object = JSON.parse(msg);

					if (object.type === "getId") {
						setSessionId(object.sessionId);
					} else if (object.type === "message") {
						setMsgList((prev) => [...prev, object]);
						if (object.safe === true || safePay === true && object.safePayRefuse === false) {

							setSafePay(true);
						} else {
							if (object.safePayAccept === true) {
								setSafePay(true);
								setSafePayAcception(1);
								setSafePaymentInfo((prevState) => {
									return { ...prevState, status: "SP02" }
								});
							} else {
								setSafePay(false);
							}
						}
					} else if (object.type === "confirm") {
						setSafePaymentInfo((prevState) => {
							return { ...prevState, status: "SP03" }
						})
					} else if (object.type === "success") {
						setSafePaymentInfo((prevState) => {
							return { ...prevState, [object.target]: "Y" }
						})
					}
				}
				return prev.concat(lastMessage)
			});
		}
	}, [lastMessage, setMessageHistory]);


	if (msgList.length != 0) {
		setChats(msgList);
		if (msgList[msgList.length - 1].sessionLength >= 3) {
			msgList = msgList.map(msg => ({ ...msg, sessionLength: 3 }));
		}
	}

	useEffect(() => {
		updateMsg();
		getChatRoomInfo();
	}, [])

	// 구매자 & 판매자 모두 거래 완료 버튼 클릭 시
	useEffect(() => {

		if (safePaymentInfo && safePaymentInfo.sellerOk === "Y" && safePaymentInfo.buyerOk === "Y" && safePaymentInfo.status !== "SP04") {
			setSafePaymentInfo((prev) => { return { ...prev, status: "SP04" } });
		}
	}, [sessionId, safePaymentInfo])

	// 구매자가 안전 거래 요청 시
	const safeTrade = () => {

		const result = confirm('판매자에게 안전 거래를 요청하시겠습니까?')
		if (result) {
			const title = "상품의 안전거래가 요청되었습니다.";
			const safety = true;
			const safePayAccept = false;
			const safeRefuse = false;
			setSafePay(true);
			insertMsg(title, safety, safePayAccept, safeRefuse);
		}
	}

	// 안전거래 수락
	const acceptSafePay = () => {

		const title = "상품의 안전거래가 수락되었습니다.";
		const safety = false;
		const safePayAccept = true;
		const safeRefuse = false;
		setSafePay(true);
		setSafePayAcception(1);
		insertMsg(title, safety, safePayAccept, safeRefuse);
		setSafePaymentInfo((prevState) => {
			return { ...prevState, status: "SP02" }
		});
	}
	// 안전거래 거절
	const refuseSafePay = () => {
		const title = "상품의 안전거래가 거절되었습니다.";
		const safety = false;
		const safePayAccept = false;
		const safeRefuse = true;
		setSafePay(false);
		setSafePayAcception(0);
		insertMsg(title, safety, safePayAccept, safeRefuse);

	}


	// DB연동 안전거래 시작 여부 조회
	const getSafePaymentInfo = async (data2) => {
		const res = await api.get(`/safe?productId=${data2.product.id}&sellerId=${data2.store.id}&buyerId=${data2.customer.id}`)
		let { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {

			if (data != null) {
				setSafePaymentInfo(data);
				setSafePayAcception(1);
				setSafePay(true);

			}
			toast.success(msg || `${id}방 안전거래 여부 조회 성공!`);

		}
	}

	// 안전결제 모달 열기
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = (finished) => {
		setIsModalOpen(false);
		// 결제 완료 됐을 때
		if (finished) {
			// 상대방
			sendMessage(JSON.stringify({
				type: "confirm",
				roomNumber: id,
				sessionId: sessionId
			}))
		}
	};

	// 안전결제 status SP03으로 변경
	const updateSafePayStatus = async () => {
		if (!(chatRoomInfo.customer.point >= chatRoomInfo.product.currentPrice)) {
			toast.error("잔액이 부족합니다!");
			return;
		} else {
			const res = await api.patch(`/safe`, {
				productId: chatRoomInfo.product.id,
				sellerId: chatRoomInfo.store.id,
				buyerId: chatRoomInfo.customer.id,
				status: 'buyerPayment'
			});
			const { data: { resultCode, msg, data } } = res;
			if (resultCode == '200') {
				toast.success(msg || `결제 성공`);
				if (userId === chatRoomInfo.customer.id) { // 구매자일때
					getUserDetail();
				}
			}
		}
		closeModal(true);
	}


	// 판매자 판매 확정 버튼 클릭
	const sellerConfirm = async () => {
		if (chatRoomInfo != null) {
			const res = await api.patch(`/safe`, {
				productId: chatRoomInfo.product.id,
				sellerId: chatRoomInfo.store.id,
				buyerId: chatRoomInfo.customer.id,
				status: 'sellerOk'
			});
			const { data: { resultCode, msg, data } } = res;
			if (resultCode == '200') {
				toast.success(msg || `판매 확정 성공`);

			}
			sendMessage(JSON.stringify({
				type: "success",
				roomNumber: id,
				sessionId: sessionId,
				target: "sellerOk"
			}))
		}
	}

	// 구매자 구매 확정 버튼 클릭
	const buyerConfirm = async () => {
		if (chatRoomInfo != null) {
			const res = await api.patch(`/safe`, {
				productId: chatRoomInfo.product.id,
				sellerId: chatRoomInfo.store.id,
				buyerId: chatRoomInfo.customer.id,
				status: 'buyerOk'
			});
			const { data: { resultCode, msg, data } } = res;
			if (resultCode == '200') {
				toast.success(msg || `판매 확정 성공`);
				sendMessage(JSON.stringify({
					type: "success",
					roomNumber: id,
					sessionId: sessionId,
					target: 'buyerOk'
				}))
			}
		}
	}

	useEffect(() => {
		if (safePaymentInfo != null && safePaymentInfo.status == 'SP04' && userId === chatRoomInfo.store.id) { // 판매자 && 거래완료 될때
			getUserDetail();
		}
	}, [safePaymentInfo])

	if (chatRoomInfo != null) {
		console.log(chatRoomInfo);
	}

	return (
		<div className={styles.chatRoom}>
			<div className={styles.chatRoomHeader}>
				<div className={styles.chatProfile}>
					<img src={chatRoomInfo != null ? chatRoomInfo.store.profileImageUrl : ""}
						className={styles.profileImg} />
					<div className={styles.chatName}>
						{chatRoomInfo != null && chatRoomInfo.customer.id == userId ? chatRoomInfo.store.nickname : ""}
						{chatRoomInfo != null && chatRoomInfo.customer.id != userId ? chatRoomInfo.customer.nickname : ""}
					</div>
				</div>
				<div className={styles.safeTradeDiv}>
					{(chatRoomInfo != null && chatRoomInfo.customer.id == userId && safePaymentInfo != null && safePaymentInfo.status == 'SP01' && safePayAcception == 0) || (chatRoomInfo != null && chatRoomInfo.customer.id == userId && safePay == false && safePayAcception == 0) ?
						<button className={styles.safeTradeBtn} onClick={safeTrade} >
							<span className={styles.safeIcon}><AiOutlineSafety /></span>
							<span>안전거래</span>
						</button>
						: ""}
					{(chatRoomInfo != null && chatRoomInfo.customer.id != userId && safePaymentInfo != null && safePaymentInfo.status == 'SP01' && safePayAcception == 1) || (chatRoomInfo != null && chatRoomInfo.customer.id != userId && msgList.length > 0 && safePay == true && safePayAcception == 0) ?
						<div className={styles.safeTradeSeller}>
							<button className={styles.safeTradeBtnAccept} onClick={acceptSafePay}>안전거래 수락</button>
							<button className={styles.safeTradeBtnRefuse} onClick={refuseSafePay}>안전거래 거절</button>
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.status == 'SP02' && chatRoomInfo != null && chatRoomInfo.customer.id == userId ?
						<div className={styles.pay}>
							<div className={styles.safeTrading}>안전거래중인 상품입니다.</div>
							<button onClick={openModal} className={styles.payBtn}><MdOutlinePayment />결제하기</button>
							<SafePayModal isModalOpen={isModalOpen} onClose={closeModal} point={chatRoomInfo.product.currentPrice} ok={updateSafePayStatus} />
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.status == 'SP02' && chatRoomInfo != null && chatRoomInfo.customer.id != userId ?
						<div className={styles.pay}>
							<div className={styles.safeTrading2}>안전거래중인 상품입니다.</div>
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.sellerOk != 'Y' && safePaymentInfo.status == 'SP03' && chatRoomInfo != null && chatRoomInfo.customer.id != userId ?
						<div className={styles.confirm}>
							<div className={styles.safeTrading}>안전거래중인 상품입니다.</div>
							<button className={styles.confirmBtn} onClick={sellerConfirm}>판매 확정</button>
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.buyerOk != 'Y' && safePaymentInfo.status == 'SP03' && chatRoomInfo != null && chatRoomInfo.customer.id == userId ?
						<div className={styles.confirm}>
							<div className={styles.safeTrading}>안전거래중인 상품입니다.</div>
							<button className={styles.confirmBtn} onClick={buyerConfirm}>구매 확정</button>
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.sellerOk == 'Y' && safePaymentInfo.status != 'SP04' && chatRoomInfo != null && chatRoomInfo.customer.id != userId ?
						<div>
							구매자의 거래 확정을 대기중입니다.
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.buyerOk == 'Y' && safePaymentInfo.status != 'SP04' && chatRoomInfo != null && chatRoomInfo.customer.id == userId ?
						<div>
							판매자의 거래 확정을 대기중입니다.
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.status == 'SP04' && chatRoomInfo != null && chatRoomInfo.customer.id != userId ?
						<div>
							완료된 거래입니다.
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.status == 'SP04' && chatRoomInfo != null && chatRoomInfo.customer.id == userId ?
						<div>
							완료된 거래입니다.
						</div>
						: ""}
				</div>
				<div className={styles.chatProduct}>
					<div className={styles.connectProduct}>연결된 상품</div>
					<div className={styles.chatProductInfo}>
						<img src={chatRoomInfo != null ? chatRoomInfo.product.thumbnailUrl : ""}
							className={styles.productImg} />
						<div className={styles.price}>&nbsp;{chatRoomInfo == null ? '' : chatRoomInfo.product.currentPrice}원</div>
					</div>
					<div className={styles.chatProductTitle}>{chatRoomInfo == null ? '' : chatRoomInfo.product.productTitle}</div>
				</div>
			</div>

			<div className={styles.chatting}>
				<div className={styles.chatView}>

					<div>

						{chatRoomInfo && chatRoomInfo.chatMessages && chatRoomInfo.chatMessages.map(function (msg, index) {
							let month = (new Date(msg.createDate).getMonth() + 1).toString();
							if (Number(month) < 10) {
								month = "0" + month;
							}
							let date = (new Date(msg.createDate).getDate()).toString();
							if (Number(date) < 10) {
								date = "0" + date;
							}
							let hour = (new Date(msg.createDate).getHours()).toString();

							if (Number(hour) > 12) {
								if (Number(hour) - 12 < 10) {
									hour = "오후 0" + (Number(hour) - 12);
								} else {
									hour = "오후 " + (Number(hour) - 12);
								}

							} else {
								if (Number(hour) < 10) {
									hour = "오전 0" + hour;
								} else {
									hour = "오전 " + hour;
								}
							}
							let minute = (new Date(msg.createDate).getMinutes()).toString();
							if (Number(minute) < 10) {
								minute = "0" + minute;
							}
							let time = month + "/" + date + " " + hour + " : " + minute;

							return (
								<div key={index}>
									{msg.userId === userId ?
										<div className={styles.me}>
											<div className={styles.readMsg}>{msg.readYn === 'N' ? '안읽음' : ""}</div>
											<div className={styles.meTime}>{time}</div>
											<div className={styles.meMsg}>{msg.message}</div>
										</div>
										:
										<div className={styles.opponent}>
											<div className={styles.opponentMsg}>{msg.message}</div>
											<div className={styles.opponentTime}>{time}</div>
										</div>
									}
								</div>
							);
						})}
						<div>
							{msgList.map(function (msg, index) {
								let month = (new Date(msg.createDate).getMonth() + 1).toString();
								if (Number(month) < 10) {
									month = "0" + month;
								}
								let date = (new Date(msg.createDate).getDate()).toString();
								if (Number(date) < 10) {
									date = "0" + date;
								}
								let hour = (new Date(msg.createDate).getHours()).toString();

								if (Number(hour) > 12) {
									if (Number(hour) - 12 < 10) {
										hour = "오후 0" + (Number(hour) - 12);
									} else {
										hour = "오후 " + (Number(hour) - 12);
									}

								} else {
									if (Number(hour) < 10) {
										hour = "오전 0" + hour;
									} else {
										hour = "오전 " + hour;
									}
								}
								let minute = (new Date(msg.createDate).getMinutes()).toString();
								if (Number(minute) < 10) {
									minute = "0" + minute;
								}
								let time = month + "/" + date + " " + hour + " : " + minute;

								return (
									<div key={index}>
										{msg != null && msg.userId === userId ?
											<div>
												<div className={styles.me}>
													<div className={styles.readMsg}>{msg.sessionLength < 3 ? '안읽음' : ''}</div>
													<div className={styles.meTime}>{time}</div>
													<div className={styles.meMsg}>{msg.msg}</div>
												</div>
											</div>
											:
											<div>
												<div className={styles.opponent}>
													<div className={styles.opponentMsg}>{msg.msg}</div>
													<div className={styles.opponentTime}>{time}</div>
												</div>
											</div>
										}
									</div>);
							})}
						</div>
					</div>
				</div>

				<div className={styles.chatInput}>
					<input className={styles.inputMsg} placeholder="메시지를 입력하세요." value={chat}
						onChange={(e) => {
							if (e.target.value.trim() != '') {
								setChat(e.target.value)
							}
						}} onKeyPress={(e) => {
							if (e.key == 'Enter') {
								let safety = false;
								if (safePay) {
									safety = true;
								} else {
									safety = false;
								}
								const safePayAccept = false;
								const safeRefuse = false;
								if (e.target.value.trim() != '') {
									insertMsg(e.target.value, safety, safePayAccept, safeRefuse);
								}
								setChat('');
							}
						}} />
				</div>
			</div>
		</div>
	);
}
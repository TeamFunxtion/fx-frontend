"use client"
import styles from "./page.module.css"
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import useWebSocket from 'react-use-websocket';
import { AiOutlineSafety } from "react-icons/ai";
import Link from "next/link";
import { MdOutlinePayment } from "react-icons/md";

export default function User() {


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
			// console.log(data);
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
	const insertMsg = (chat, safety, safePayAccept) => {

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
			safePayAccept: safePayAccept
		}))
	}


	// 웹소켓 구현 위치

	const { sendMessage, lastMessage } = useWebSocket(`ws://localhost:8090/chat/${id}`);

	const [sessionId, setSessionId] = useState(0);

	const [messageHistory, setMessageHistory] = useState([]);
	const [msgList, setMsgList] = useState([]);
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
						if (object.safe === true) {
							setSafePay(true);
						} else {
							if (object.safePayAccept === true) {
								setSafePay(true);
								setSafePayAcception(1);
								// console.log(object.safePayAccept);
							} else {
								setSafePay(false);
							}

						}
					}
				}
				return prev.concat(lastMessage)
			});
		}
	}, [lastMessage, setMessageHistory]);


	if (msgList.length != 0) {
		if (msgList[msgList.length - 1].sessionLength >= 3) {
			for (let i = 0; i < msgList.length; i++) {
				msgList[i].sessionLength = 3;
			}
		}
	}

	useEffect(() => {
		updateMsg();
		getChatRoomInfo();
	}, [])

	const safeTrade = () => {

		const result = confirm('판매자에게 안전 거래를 요청하시겠습니까?')
		if (result) {
			const title = "상품의 안전거래가 요청되었습니다.";
			const safety = true;
			const safePayAccept = false;
			setSafePay(true);
			insertMsg(title, safety, safePayAccept);
		}
	}

	// 안전거래 수락
	const acceptSafePay = () => {
		const title = "상품의 안전거래가 수락되었습니다.";
		const safety = false;
		const safePayAccept = true;
		setSafePay(false);
		setSafePayAcception(1);
		setSafePaymentInfo((prevState) => {
			return { ...prevState, startYn: "Y" }
		});
		insertMsg(title, safety, safePayAccept);

		// console.log(safePay);
	}
	// 안전거래 거절
	const refuseSafePay = () => {
		const title = "상품의 안전거래가 거절되었습니다.";
		const safety = false;
		const safePayAccept = false;
		setSafePay(false);
		setSafePayAcception(0);
		insertMsg(title, safety, safePayAccept);
		// console.log(safePay);
	}


	// DB연동 안전거래 시작 여부 조회
	const getSafePaymentInfo = async (data2) => {
		const res = await api.get(`/safe?productId=${data2.product.id}&sellerId=${data2.store.id}&buyerId=${data2.customer.id}`)
		let { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			// console.log(data);
			setSafePaymentInfo(data);
			setSafePayAcception(1);
			setSafePay(true);
			toast.success(msg || `${id}방 안전거래 여부 조회 성공!`);
		}
	}

	return (
		<div className={styles.chatRoom}>
			<div className={styles.chatRoomHeader}>
				<div className={styles.chatProfile}>
					<img src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_1280.png"
						className={styles.profileImg} />
					<div className={styles.chatName}>
						{chatRoomInfo != null && chatRoomInfo.customer.id == userId ? chatRoomInfo.store.nickname : ""}
						{chatRoomInfo != null && chatRoomInfo.customer.id != userId ? chatRoomInfo.customer.nickname : ""}
					</div>
				</div>
				<div className={styles.safeTradeDiv}>
					{(chatRoomInfo != null && chatRoomInfo.customer.id == userId && safePaymentInfo != null && safePaymentInfo.startYn == 'N' && safePayAcception == 0) || (chatRoomInfo != null && chatRoomInfo.customer.id == userId && safePay == false && safePayAcception == 0) ?
						<button className={styles.safeTradeBtn} onClick={safeTrade} >
							<span className={styles.safeIcon}><AiOutlineSafety /></span>
							<span>안전거래</span>
						</button>
						: ""}
					{(chatRoomInfo != null && chatRoomInfo.customer.id != userId && safePaymentInfo != null && safePaymentInfo.startYn == 'N' && safePayAcception == 1) || (chatRoomInfo != null && chatRoomInfo.customer.id != userId && msgList.length > 0 && safePay == true && safePayAcception == 0) ?
						<div className={styles.safeTradeSeller}>
							<button className={styles.safeTradeBtnAccept} onClick={acceptSafePay}>안전거래 수락</button>
							<button className={styles.safeTradeBtnRefuse} onClick={refuseSafePay}>안전거래 거절</button>
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.startYn == 'Y' && chatRoomInfo != null && chatRoomInfo.customer.id == userId ?
						<div className={styles.pay}>
							<div className={styles.safeTrading}>안전거래중인 상품입니다.</div>
							<Link href={`https://www.google.com`} className={styles.payBtn}><MdOutlinePayment />결제하기</Link>
						</div>
						: ""}
					{safePaymentInfo != null && safePaymentInfo.startYn == 'Y' && chatRoomInfo != null && chatRoomInfo.customer.id != userId ?
						<div className={styles.pay}>
							<div className={styles.safeTrading2}>안전거래중인 상품입니다.</div>
						</div>
						: ""}
				</div>
				<div className={styles.chatProduct}>
					<div className={styles.connectProduct}>연결된 상품</div>
					<div className={styles.chatProductInfo}>
						<img src="https://cdn.pixabay.com/photo/2016/03/31/20/13/chair-1295604_1280.png"
							className={styles.productImg} />
						<div className={styles.price}>&nbsp;{chatRoomInfo == null ? '' : chatRoomInfo.product.productPrice}원</div>
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
							setChat(e.target.value)
						}} onKeyPress={(e) => {
							if (e.key == 'Enter') {
								const safety = false;
								const safePayAccept = false;
								insertMsg(e.target.value, safety, safePayAccept);
								setChat('');
							}
						}} />
				</div>
			</div>
		</div>
	);
}
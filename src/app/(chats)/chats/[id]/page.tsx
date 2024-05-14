"use client"
import styles from "./page.module.css"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useWebSocket from 'react-use-websocket';





export default function User() {

	const router = useRouter();
	const id = usePathname().substring(7);
	const userInfoValue = useRecoilValue(userInfoState);
	const userId = userInfoValue.id;

	// DB연동 (해당 채팅방 정보 조회)
	const [chatRoomInfo, setChatRoomInfo] = useState(null);
	const getChatRoomInfo = async () => {
		const res = await api.get(`chats/${id}?id=${id}`)
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			setChatRoomInfo(data);
			toast.success(msg || `${id}방 조회 성공!`);
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
	const insertMsg = () => {
		sendMessage(JSON.stringify({
			type: 'message',
			roomNumber: id,
			sessionId: sessionId,
			userId: userId,
			msg: chat,
			createDate: today

		}))
	}


	// 웹소켓 구현 위치

	const { sendMessage, lastMessage } = useWebSocket(`ws://localhost:8090/chat/${id}`);

	const [sessionId, setSessionId] = useState(0);

	const [messageHistory, setMessageHistory] = useState([]);
	const [msgList, setMsgList] = useState([]);

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


	const [chat, setChat] = useState('');
	return (

		<div className={styles.chatRoom}>
			<div className={styles.chatRoomHeader}>
				<div className={styles.chatProfile}>
					<img src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_1280.png"
						className={styles.profileImg} />
					<div className={styles.chatName}>{chatRoomInfo == null ? '' : chatRoomInfo.store.nickname}</div>
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
								console.log(msgList);
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

								insertMsg();
							}
						}} />
				</div>
			</div>
		</div>
	);
}
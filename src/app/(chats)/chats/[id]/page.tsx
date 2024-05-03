"use client"
import styles from "./page.module.css"
import { useState } from "react";
export default function User() {
	const today = new Date();
	let nowTime = ''
	if (today.getHours() >= 12) {
		nowTime = '오후' + today.getHours() + ':' + today.getMinutes();
	} else {
		nowTime = '오전 ' + today.getHours() + ':' + today.getMinutes();
	}
	const [rooms, setRooms] = useState(['나는 채팅방이 있는 상태야']);
	const [myMsg, setMyMsg] = useState
		([{
			text: "안녕 못한데요?",
			read: "안읽음",
			time: "오후 7:04"
		}])
	const [chat, setChat] = useState('');
	return (
		<div className={styles.chatRoom}>
			<div className={styles.chatRoomHeader}>
				<div className={styles.chatProfile}>
					<img src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_1280.png"
						className={styles.profileImg} />
					<div className={styles.chatName}>류연우EN</div>
				</div>
				<div className={styles.chatProduct}>
					<div className={styles.connectProduct}>연결된 상품</div>
					<div className={styles.chatProductInfo}>
						<img src="https://cdn.pixabay.com/photo/2016/03/31/20/13/chair-1295604_1280.png"
							className={styles.productImg} />
						<div className={styles.price}>999,999,999원</div>
					</div>
					<div className={styles.chatProductTitle}>탁자 삽니다.</div>
				</div>
			</div>

			<div className={styles.chatting}>
				<div className={styles.chatView}>
					<div className={styles.opponent}>
						<div className={styles.opponentMsg}>안녕하세요.</div>
						<div className={styles.opponentTime}>오후 7:04</div>
					</div>
					{myMsg.map(function (msg, index) {
						return (
							<div>
								<div className={styles.me}>
									<div>
										<div className={styles.readMsg}>{myMsg[index].read}</div>
										<div className={styles.meTime}>{myMsg[index].time}</div>
									</div>
									<div className={styles.meMsg}>{myMsg[index].text}</div>
								</div>
							</div>
						)
					})}
				</div>
				<div className={styles.chatInput}>
					<input className={styles.inputMsg} placeholder="메시지를 입력하세요." value={chat}
						onChange={(e) => {
							setChat(e.target.value)
						}} onKeyPress={(e) => {
							if (e.key == 'Enter') {
								let newList = [...myMsg];
								newList.push({
									text: chat,
									read: '안읽음',
									time: nowTime
								})
								setMyMsg(newList);
							}
						}} />
				</div>
			</div>
		</div>
	);
}
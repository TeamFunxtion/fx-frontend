import styles from "./page.module.css"

export default function Exist() {
	return (
		<div className={styles.container}>
			<div className={styles.roomList}>
				<h1 className={styles.roomCount}>전체 대화(2)</h1>
				<div>
					<div className={styles.list}>
						<img src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_1280.png"
							className={styles.profileImg} />
						<div className={styles.shortcut}>
							<div className={styles.name}>류연우EN</div>
							<div className={styles.msgArea}>
								<div className={styles.lastMsg}>나는 류연우다.</div>
								<div className={styles.lastMsgDate}>&#183; 어제</div>
							</div>
						</div>
						<img src="https://cdn.pixabay.com/photo/2016/03/31/20/13/chair-1295604_1280.png"
							className={styles.productImg} />
					</div>
				</div>
			</div>
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
						<div className={styles.me}>
							<div>
								<div className={styles.readMsg}>안읽음</div>
								<div className={styles.meTime}>오후 7:04</div>
							</div>
							<div className={styles.meMsg}>안녕 못한데요?</div>
						</div>
					</div>
					<div className={styles.chatInput}>
						<input className={styles.inputMsg} placeholder="메시지를 입력하세요." />
					</div>
				</div>
			</div>
		</div>
	)
}
"use client"
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import styles from "../../app/(chats)/chats/layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Chats() {
	const path = usePathname();

	return (
		<>
			<div className={styles.roomList}>
				<h1 className={styles.roomCount}>전체 대화(2)</h1>
				<div className={styles.height}>
					{false ?
						<div className={styles.noChatRoom}>
							<div className={styles.noRoom}>
								<div className={styles.chatIcon}>
									<HiOutlineChatBubbleLeftEllipsis />
								</div>
								<br />
								<div className={styles.noChatFont}>지금 바로 대화를 시작해보세요.</div>
								<br />
								<div className={styles.noChatFontSmall}>내가 올린 상품이나 관심있는 상품에 관한</div>
								<div className={styles.noChatFontSmall}>대화를 여기서 볼 수 있어요.</div>
							</div>
						</div> :
						<Link href="/chats/user"><div className={styles.list}>
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
						</div></Link>}
				</div>
			</div>
			{path !== "/chats" ? <></> :
				<div className={styles.chatRoom}>
					<div className={styles.noChatRoom}>
						<div className={styles.noChat}>
							<div className={styles.chatIcon}>
								<HiOutlineChatBubbleLeftEllipsis />
							</div>
							<br />
							<div className={styles.noChatFont}>대화방을 선택해 주세요.</div>
						</div>
					</div>
				</div>}
		</>
	)
}
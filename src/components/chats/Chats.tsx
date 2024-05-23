"use client"
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import styles from "../../app/(chats)/chats/layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { chatState } from "@/store/atoms";

export default function Chats() {

	const chats = useRecoilValue(chatState);

	const path = usePathname();
	// DB연동 (채팅방 리스트 조회)
	const userInfoValue = useRecoilValue(userInfoState);
	const [chatRoomList, setChatRoomList] = useState([]);

	const getChatRoomList = async () => {
		if (!userInfoValue.id) {
			router.push("/auth/login");
			return false;
		}

		const res = await api.get('/chats?id=' + userInfoValue.id);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {

			setChatRoomList(data);
			toast.success(msg || '채팅방 조회 성공!');
		}
	}
	const router = useRouter();
	useEffect(() => {
		getChatRoomList();

	}, []);



	let lastMsgDate = "";
	if (chats.length > 0) {
		lastMsgDate = chats[chats.length - 1].createDate.substring(5, 7) + "/" + chats[chats.length - 1].createDate.substring(8, 10);
	}

	return (
		<>
			<div className={styles.chatsContainer}>
				<h1 className={styles.chatsTitle}>전체 대화</h1>
				{
					chatRoomList.length == 0 ?
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
						<div>
							{chatRoomList.map(function (item, index) {
								let month = (new Date(item.updateDate).getMonth() + 1).toString();

								if (Number(month) < 10) {
									month = "0" + month;
								}
								let date = (new Date(item.updateDate).getDate()).toString();
								if (Number(date) < 10) {
									date = "0" + date;
								}
								return (
									<Link href={`/chats/${item.id}`}>
										<div key={index} className={styles.list}>
											<img src={item.store.profileImageUrl}
												className={styles.profileImg} />

											<div className={styles.shortcut}>
												{userInfoValue.id != item.store.id ?
													<div className={styles.roomName}>{item.store.nickname}</div> :
													<div className={styles.roomName}>{item.customer.nickname}</div>}
												<div className={styles.msgArea}>
													<div className={styles.lastMsg}>{chats.length > 0 ? chats[chats.length - 1].msg : (item.chatMessages.length != 0 ? item.chatMessages[0].message : "")}</div>
													<div className={styles.lastMsgDate}>{chats.length > 0 ? lastMsgDate : month + "/" + date}</div>
												</div>
											</div>
											<img src={item.product.thumbnailUrl}
												className={styles.productImg} />
										</div>
									</Link>
								)
							})}
						</div>}
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
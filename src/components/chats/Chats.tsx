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

export default function Chats() {

	const path = usePathname();
	// DB연동 (채팅방 리스트 조회)
	const userInfoValue = useRecoilValue(userInfoState);
	const [chatRoomList, setChatRoomList] = useState([]);
	const getChatRoomList = async () => {
		const res = await api.get('/chats?id=' + userInfoValue.id);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			const newList = [...chatRoomList, ...data];
			setChatRoomList(newList);
			toast.success(msg || '채팅방 조회 성공!');
		}
	}
	const router = useRouter();
	// console.log(chatRoomList);
	// console.log(chatRoomList[2].store.nickname);
	useEffect(() => {
		getChatRoomList();
	}, []);

	return (
		<>
			<div className={styles.roomList}>
				<h1 className={styles.roomCount}>전체 대화({chatRoomList.length})</h1>
				<div className={styles.height}>
					{chatRoomList.length == 0 ?
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
											<img src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_1280.png"
												className={styles.profileImg} />

											<div className={styles.shortcut}>
												<div className={styles.name}>{item.store.nickname}</div>
												<div className={styles.msgArea}>
													<div className={styles.lastMsg}>{item.chatMessages[0].message}</div>
													<div className={styles.lastMsgDate}> {month + "/" + date}</div>
												</div>
											</div>
											<img src="https://cdn.pixabay.com/photo/2016/03/31/20/13/chair-1295604_1280.png"
												className={styles.productImg} />
										</div>
									</Link>
								)
							})}
						</div>}
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
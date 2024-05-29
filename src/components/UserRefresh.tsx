'use client'

import useUserInfo from "@/hooks/useUserInfo"
import { useEffect, useRef } from "react"

export default function UserRefresh() {
	const { user, getUserDetail } = useUserInfo();
	const init = useRef(true);

	useEffect(() => {
		if (init.current && user && user.id) {
			init.current = false;
			getUserDetail();
		}
	}, [user])

	return (
		<></>
	)
}
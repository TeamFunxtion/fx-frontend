'use client'
import { TextField, Button } from "@mui/material";
import styles from "./page.module.css";
import api from "@/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { UserState } from "@/recoil/user";

export default function LoginPage() {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const router = useRouter();
	const setUserState = useSetRecoilState(UserState);

	const login = async () => {
		const { email, password } = user;

		if (!email) {
			toast.error("이메일을 입력하세요.");
			return false;
		}

		if (!password) {
			toast.error("비밀번호를 입력하세요.");
			return false;
		}

		const res = await api.post('/members/login', user);
		// console.log(res);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			const { memberDto } = data;
			console.log(memberDto);
			setUserState(memberDto);
			toast.success(msg);
			router.push("/");
		} else {
			toast.error(msg)
		}
	}

	const handleChangeInput = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	}

	return (
		<div>
			<div>
				<h1>로그인</h1>
				<h3>로그인해보세요!</h3>
			</div>
			<div className={styles.loginForm}>
				<TextField fullWidth label="이메일" type="email" name="email" onChange={(e) => handleChangeInput(e)} placeholder="이메일을 입력하세요." size="small" margin="normal" />
				<TextField fullWidth label="비밀번호" type="password" name="password" onChange={(e) => handleChangeInput(e)} placeholder="비밀번호를 입력하세요." size="small" />
				<div className={styles.btnContainer}>
					<Button className={styles.loginBtn} variant="contained" size="large" onClick={login} disabled={!user.email || !user.password}>로그인</Button>
				</div>
			</div>
		</div >
	)
}
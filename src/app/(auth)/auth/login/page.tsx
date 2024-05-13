'use client'
import styles from "./page.module.css";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/store/atoms";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
	email: string,
	password: string
}

export default function LoginPage() {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>()
	const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
		// console.log(values)
		const res = await api.post('/members/login', values);
		// console.log(res);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			setUserInfoState(data);
			toast.success(msg || '로그인 성공!');
			router.push("/");
		} else {
			toast.error(msg || '로그인 실패..');
		}
	}

	const router = useRouter();
	const setUserInfoState = useSetRecoilState(userInfoState);

	const onClickKakaoLogin = () => {
		const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 앱 키 중 JavaScript 키
		const redirectUri = process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URI; // 등록한 Redirect URI
		location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
	}

	return (
		<div>
			<h1>Login😄</h1>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Email" maxLength={30} />
				<input {...register("password", { required: true, minLength: 4 })} type="password" placeholder="Password" maxLength={30} />
				<button type="submit">이메일로 로그인</button>
			</form>

			<div className={styles.divide}>OR</div>

			<div className={styles.oauthContainer}>
				<img
					src="/images/oauth/kakao_login_large_wide.png"
					alt="kakao_login"
					onClick={onClickKakaoLogin}
				/>
			</div>
		</div >
	)
}
'use client'
import styles from "./page.module.css";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/store/atoms";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsKeyFill, BsPersonCircle } from "react-icons/bs";

interface FormValues {
	email: string,
	password: string
}

export default function LoginPage() {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>()
	const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
		console.log(values)
		const res = await api.post('/members/login', values);
		// console.log(res);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			const { memberDto } = data;
			console.log(memberDto);
			setUserInfoState(memberDto);
			toast.success(msg || '로그인 성공!');
			router.push("/");
		} else {
			toast.error(msg || '로그인 실패..');
		}
	}

	const router = useRouter();
	const setUserInfoState = useSetRecoilState(userInfoState);

	return (
		<div className={styles.formContainer}>
			<h1>로그인</h1>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<label className={styles.label}><BsPersonCircle /></label>
				<input className={styles.input} {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="이메일" />
				<label className={styles.label}><BsKeyFill /></label>
				<input className={styles.input} {...register("password", { required: true, minLength: 4 })} type="password" placeholder="비밀번호" />
				<button className={styles.submit} type="submit">이메일로 로그인</button>
			</form>

			<div className={styles.divide}>OR</div>

			<div className={styles.oauthContainer}>
				<img
					src="/images/oauth/kakao_login_large_wide.png"
					alt="kakao_login"
				/>
			</div>


		</div >
	)
}
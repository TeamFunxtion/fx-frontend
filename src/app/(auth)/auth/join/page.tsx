'use client'
import styles from "../login/page.module.css";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsKeyFill, BsPersonCircle } from "react-icons/bs";
import { useRef } from "react";

interface FormValues {
	email: string,
	password: string,
	passwordConfirm: string
}

export default function JoinPage() {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>()

	// 비밀번호와 비밀번호 확인이 일치하는지 검증하기 위해 "password" input 의 value 를 추적함
	const passwordRef = useRef<string | null>(null)
	passwordRef.current = watch("password")

	const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
		console.log(values)
		const res = await api.post('/members/join', values);
		console.log(res);
		const { data: { resultCode, msg, data } } = res;
		if (resultCode == '200') {
			toast.success(msg || '회원가입 성공!');
			router.push("/auth/login");
		} else {
			toast.error(msg || '회원가입 실패..');
		}
	}
	const router = useRouter();

	return (
		<div className={styles.formContainer}>
			<h1>회원가입</h1>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<label className={styles.label}><BsPersonCircle /></label>
				<input className={styles.input} {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="이메일" />
				<label className={styles.label}><BsKeyFill /></label>
				<input className={styles.input} {...register("password", { required: true, minLength: 4 })} type="password" placeholder="비밀번호" />
				<label className={styles.label}><BsKeyFill /></label>
				<input className={styles.input} {...register("passwordConfirm", { required: true, validate: (value) => value === passwordRef.current })} type="password" placeholder="비밀번호 확인" />
				<button className={styles.submit} type="submit">회원가입</button>
			</form>
		</div >
	)
}
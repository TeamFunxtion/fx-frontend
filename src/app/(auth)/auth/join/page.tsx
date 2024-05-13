'use client'
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
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
		// console.log(values)
		const res = await api.post('/members/join', values);
		// console.log(res);
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
		<div>
			<h1>Join😄</h1>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Email" maxLength={30} />
				<input {...register("password", { required: true, minLength: 4 })} type="password" placeholder="Password" maxLength={30} />
				<input {...register("passwordConfirm", { required: true, validate: (value) => value === passwordRef.current })} type="password" placeholder="Password Confirm" maxLength={30} />
				<button type="submit">회원가입</button>
			</form>
		</div >
	)
}
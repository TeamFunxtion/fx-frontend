'use client'

import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

interface KakaoLogin {
	code: string;
}

export default function KakaoLoginCallback() {
	const searchParams = useSearchParams();
	const setUserInfoState = useSetRecoilState(userInfoState);
	const router = useRouter();

	useEffect(() => {
		const code = searchParams.get("code");
		if (code) {
			login(code);
		}
	}, [])

	const login = async (code: string) => {
		const kakaoLogin: KakaoLogin = {
			code,
		};

		try {
			const accessToken = await getAccessToken(code);
			const profile = await getKakaoProfile(accessToken);

			const { id, kakao_account: { email, profile: { nickname, profile_image_url } } } = profile;

			const kakaoLoginResponse = await api.post("/members/kakao/login", {
				id,
				email,
				nickname,
				profileImageUrl: profile_image_url,
			});

			const { data: { resultCode, msg, data } } = kakaoLoginResponse;
			if (resultCode == '200') {
				setUserInfoState(data);
				toast.success(msg || '로그인 성공!');
				router.push("/");
			} else {
				toast.error(msg || '로그인 실패..');
			}

		} catch (e) {
			console.error(e);
		}
	};

	const getAccessToken = async (code: string) => {
		const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
		const KAKAO_CALLBACK_URI = process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URI;

		const result = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${KAKAO_CALLBACK_URI}&code=${code}`);
		const parsedResult = await result.json();
		return parsedResult.access_token;
	}

	const getKakaoProfile = async (token: string) => {
		const result = await fetch(`https://kapi.kakao.com/v2/user/me`, {
			headers: {
				"Authorization": `Bearer ${token}`,
			}
		});
		return await result.json();
	}

	return (
		<>카카오 로그인 중...</>
	)
}
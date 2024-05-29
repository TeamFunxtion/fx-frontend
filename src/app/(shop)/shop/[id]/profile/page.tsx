"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import api, { fileApi } from "@/utils/api";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userInfoState } from "@/store/atoms";
import { usePathname, useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import useUserInfo from '@/hooks/useUserInfo';

export default function ProfilePage() {
    const userInfoValue = useRecoilValue(userInfoState);
    const resetUserInfo = useResetRecoilState(userInfoState);
    const userId = userInfoValue.id;
    const userEmail = userInfoValue.email;
    const id = usePathname().substring(7);
    const router = useRouter();
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [email, setEmail] = useState(userEmail);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const file = useRef(null);
    const { getUserDetail } = useUserInfo();

    useEffect(() => {
        // console.log(id);
        api.get(`members?id=` + userId)
            .then(response => {
                const data = response.data.data;
                setNickname(data.nickname);
                setIntro(data.intro);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setProfileImageUrl(data.profileImageUrl);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleUpdate = () => {
        // 새 비밀번호와 새 비밀번호 확인이 입력된 경우에만 검증합니다.
        if (newPassword || confirmNewPassword) {
            if (!newPassword) {
                toast.error('새 비밀번호를 입력해 주세요.');
                return;
            }
            if (newPassword !== confirmNewPassword) {
                toast.error('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
                return;
            }
            if (password === newPassword) {
                toast.error('현재 비밀번호와 새 비밀번호는 같을 수 없습니다.');
                return;
            }
        }

        var regex = /^[0-9]*$/; // 숫자만 체크
        if (!(regex.test(phoneNumber) && (11 == phoneNumber.length))) {
            toast.error("핸드폰번호는 숫자 11자리로 입력하세요.");
            return;
        }

        const requestData = {
            email,
            nickname,
            intro,
            password,
            phoneNumber,
            newPassword,
            confirmNewPassword
        };

        const formData = new FormData();
        formData.append("file", file.current);
        formData.append("updateUser", JSON.stringify(requestData));


        fileApi.put('/members/update', formData)
            .then(response => {
                console.log(response.data);
                if (response.data.resultCode !== '200') {
                    toast.error(response.data.msg);
                } else {
                    toast.success(response.data.msg);
                }
                setNickname(nickname);
                setIntro(intro);
                setPhoneNumber(phoneNumber);
                // 비밀번호 필드를 초기화
                setPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                getUserDetail();
                file.current = null;
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                toast.error("회원 정보 수정에 실패하였습니다.");
            });
    };

    const handleDelete = () => {
        const confirmDeletion = confirm("정말로 회원 탈퇴를 하시겠습니까?");
        if (confirmDeletion) {
            api.delete(`/members/delete/${userId}`)
                .then(response => {
                    console.log(response.data);
                    toast.success(response.data.msg);
                    if (response.status === 200) { // 응답 상태가 200인지 확인
                        // Recoil 상태 초기화 (로그아웃)
                        resetUserInfo();
                        // 홈 화면으로 이동
                        router.push('/');
                    }
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                    toast.error("회원 탈퇴에 실패하였습니다.");
                });
        }
    };

    const handleChangeFile = (event: any) => {

        const files = event.target.files;

        if (files.length === 0) return;

        // 파일 크기 1MB 이하인것만 
        if (files[0].size > (1024 * 1024 * 1)) {
            toast.error("이미지는 최대 1MB 크기로 제한됩니다.");
            return false;
        }

        file.current = files[0];

        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
                    // console.log(base64)
                    if (base64) {
                        let base64Sub = base64.toString()
                        setProfileImageUrl(base64Sub);
                    }
                    event.target.value = '';
                }
            }
        }
    }

    return (
        <div>
            <h3>회원정보 수정</h3>
            <label htmlFor="file">
                <a><img className={styles.image} src={profileImageUrl} alt="" /></a>
            </label>
            <input type="file" id="file" onChange={handleChangeFile} style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg" />
            <table className={styles.form}>
                <tbody>
                    <tr>
                        <td>닉네임</td>
                        <td><input className={styles.input} type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>소개글</td>
                        <td><textarea className={styles.inputTextarea} value={intro} onChange={(e) => setIntro(e.target.value)}></textarea></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input className={styles.input} type="text" value={email} readOnly /></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>새 비밀번호</td>
                        <td><input className={styles.input} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>새 비밀번호 확인</td>
                        <td><input className={styles.input} type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>핸드폰번호</td>
                        <td><input className={styles.input} type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} maxLength={11} /></td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.buttondiv}>
                <button className={styles.updateButton} onClick={handleUpdate}>수정완료</button>
                <button className={styles.outButton} onClick={handleDelete}>회원탈퇴</button>
            </div>
        </div>
    );
}
"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";
import { usePathname } from "next/navigation";

export default function ProfilePage() {
    const userInfoValue = useRecoilValue(userInfoState);
    const userId = userInfoValue.id;
    const userEmail = userInfoValue.email;
    const id = usePathname().substring(7);
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [email, setEmail] = useState(userEmail);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(id);
        api.get(`members/${userId}?userId=` + userId)
            .then(response => {
                const data = response.data.data;
                setNickname(data.nickname);
                setIntro(data.intro);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('회원 정보를 불러오는 데 실패했습니다.');
            });
    }, [userId]);

    const handleUpdate = () => {
        if (newPassword !== confirmNewPassword) {
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

        api.put('/members/update', requestData)
            .then(response => {
                console.log(response.data);
                alert(response.data.msg);
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert("회원 정보 수정에 실패하였습니다.");
            });
    };

    const handleDelete = () => {
        const confirmDeletion = confirm("정말로 회원 탈퇴를 하시겠습니까?");
        if (confirmDeletion) {
            api.delete(`/members/delete/${userId}`)
                .then(response => {
                    console.log(response.data);
                    alert(response.data.msg);
                    if (response.data.code === "200") {
                        router.push('/');
                    }
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                    alert("회원 탈퇴에 실패하였습니다.");
                });
        }
    };

    return (
        <div>
            <h3>회원정보 수정</h3>
            <a><img className={styles.image} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" /></a>
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
                        <td>새 비밀번호 확인</td> {/* 새 비밀번호 확인 필드 추가 */}
                        <td><input className={styles.input} type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>핸드폰번호</td>
                        <td><input className={styles.input} type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.buttondiv}>
                <button className={styles.updateButton} onClick={handleUpdate}>수정완료</button>
                <button className={styles.outButton} onClick={handleDelete}>회원탈퇴</button>
            </div>
        </div>
    );
}
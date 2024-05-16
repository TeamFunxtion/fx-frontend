"use client";
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import api from "@/utils/api";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/atoms";

export default function Update() {
    const userInfoValue = useRecoilValue(userInfoState);
    const userEmail = userInfoValue.email;
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleUpdate = () => {
        const data = {
            email,
            nickname,
            intro,
            password,
            currentPassword,
            newPassword,
            phoneNumber,
        };

        api.put('/members/update', data)
            .then(response => {
                console.log(response.data);
                // 회원 정보 수정 성공 시 처리
            })
            .catch(error => {
                console.error('Error updating member:', error);
                // 회원 정보 수정 실패 시 처리
            });
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
                        <td><input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>현재 비밀번호</td>
                        <td><input className={styles.input} type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>신규 비밀번호</td>
                        <td><input className={styles.input} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>핸드폰번호</td>
                        <td><input className={styles.input} type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.buttondiv}>
                <button className={styles.updateButton} onClick={handleUpdate}>수정완료</button>
                <button className={styles.outButton}>회원탈퇴</button>
            </div>

        </div>
    );
}
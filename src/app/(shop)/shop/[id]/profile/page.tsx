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
    const [email, setEmail] = useState(userEmail); // 초기값 설정
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        console.log(id);
        // 컴포넌트가 마운트될 때 사용자 데이터를 가져옴
        api.get(`members/${userId}?userId=` + userId)
            .then(response => {
                const data = response.data.data;
                setNickname(data.nickname);
                setIntro(data.intro);
                setEmail(data.email);
                setPassword(data.password); // 비밀번호 추가
                setPhoneNumber(data.phoneNumber); // 전화번호 추가
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('회원 정보를 불러오는 데 실패했습니다.');
            });
    }, []);

    const handleUpdate = () => {
        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (password !== confirmPassword) {
            alert("비밀번호와 현재 비밀번호가 일치하지 않습니다.");
            return;
        }
        // 현재 비밀번호와 신규 비밀번호가 같은지 확인
        if (password === newPassword) {
            alert("현재 비밀번호와 신규 비밀번호는 같을 수 없습니다.");
            return;
        }
        // 신규 비밀번호가 비어 있는지 확인
        if (newPassword.trim() === '') {
            alert("신규 비밀번호를 입력해 주세요.");
            return;
        }


        // 서버에 비밀번호 변경 요청
        api.put('/members/update', {
            email,
            nickname,
            intro,
            password,
            newPassword,
            phoneNumber
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.msg); // 서버로부터의 응답 메시지 표시
            })
            .catch(error => {
                console.error('Error updating password:', error);
                alert("회원 정보 수정에 실패하였습니다.");
            });
    };
    const handleDelete = () => {
        // 서버에 탈퇴 요청
        api.delete(`/delete/${userId}`) // userId를 경로 변수로 전달
            .then(response => {
                console.log(response.data);
                alert(response.data.msg);
                if (response.data.code === "200") {
                    router.push('/'); // 탈퇴 후 메인 페이지로 이동
                }
            })
            .catch(error => {
                console.error('Error deleting account:', error);
                alert("회원 탈퇴에 실패하였습니다.");
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
                        <td><input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} readOnly /></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>현재 비밀번호</td>
                        <td><input className={styles.input} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></td>
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
                <button className={styles.outButton} onClick={handleDelete}>회원탈퇴</button>
            </div>
        </div >
    );
}
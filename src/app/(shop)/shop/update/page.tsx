import styles from "./page.module.css"

export default function Update(){
    return(
        <div>
            <h3>회원정보 수정</h3>
            <a><img className={styles.image} src="https://image.kmib.co.kr/online_image/2023/0217/2023021610191969585_1676510359_0017971537.jpg" alt="" /></a>
            <table className={styles.form}>

        <tbody>
          <tr>
            <td>닉네임</td>
            <td><input className={styles.input} type="text"/></td>
          </tr>
          <tr>
            <td>소개글</td>
            <td> <textarea className={styles.inputTextarea}></textarea></td>
          </tr>
          <tr>
            <td>이메일</td>
            <td><input className={styles.input} type="text" /></td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td><input className={styles.input} type="text"/></td>
            <td><button className={styles.updateButton}>수정</button></td>
          </tr>
          <tr>
            <td>현재비밀번호</td>
            <td><input className={styles.input} type="text"/></td>
          </tr>
          <tr>
            <td>신규비밀번호</td>
            <td><input className={styles.input} type="text"/></td>
          </tr>
          <tr>
            <td>핸드폰번호</td>
            <td><input className={styles.input} type="text"/></td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttondiv}>
                        <button className={styles.updateButton}>수정완료</button>
                        <button className={styles.outButton}>회원탈퇴</button>
             </div>
            {/*<div className={styles.form}>
                    <div>
                        <input type="image" placeholder="이미지를 올려주세요"/>
                    </div>
                    <div>
                        닉네임<input className={styles.input} type="text"/> 
                    </div>
                    <div>
                        소개글 <textarea className={styles.inputTextarea}></textarea>
                    </div>
                    <div>
                        이메일 <input className={styles.input} type="text" />
                    </div>
                    <div>
                        비밀번호 <input className={styles.input} type="password" /> 
                        <button className={styles.updateButton}>수정</button>
                    </div>
                    <div>
                        현재비밀번호 <input className={styles.input} type="password" />
                    </div>
                    <div>
                        신규비밀번호 <input className={styles.input} type="password" />
                    </div>
                    <div>
                        핸드폰번호 <input className={styles.input} type="text" />
                    </div>
            </div>
                    <div className={styles.buttondiv}>
                        <button className={styles.updateButton}>수정완료</button>
                        <button className={styles.outButton}>회원탈퇴</button>
             </div>*/}
                    
        </div>
    )
}
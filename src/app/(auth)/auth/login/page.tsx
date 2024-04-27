import { TextField, Button } from "@mui/material";
import styles from "./page.module.css";

export default function LoginPage() {
	return (
		<div>
			<div>
				<h1>로그인</h1>
				<h3>로그인해보세요!</h3>
			</div>
			<div>
				<TextField fullWidth label="이메일" type="email" placeholder="이메일을 입력하세요." size="small" margin="normal" />
				<TextField fullWidth label="패스워드" type="password" placeholder="패스워드를 입력하세요." size="small" />
				<Button className={styles.loginButton} variant="contained" size="large">로그인</Button>
			</div>
		</div>
	)
}
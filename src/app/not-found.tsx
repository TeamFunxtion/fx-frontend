import { Metadata } from "next";
import styles from '@/styles/NotFound.module.css'

export const metadata: Metadata = {
	title: "Not Found"
};

export default function NotFoundPage() {
	return (
		<div className={styles.container}>
			<h1>😱 존재하지 않는 페이지입니다. 경로를 다시 확인해주세요.</h1>
		</div>
	)
}
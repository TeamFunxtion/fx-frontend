'use client'
import styles from "@/styles/FxTab.module.css"
import { useState } from "react"

export default function FxTab({ items, onClick }) {
	const [index, setIndex] = useState(0);

	const clickTab = (idx) => {
		setIndex(idx);
		onClick(idx);
	}

	return (
		<ul className={styles.tabList}>
			{
				items && items.map((tab, idx) => (
					<li className={`${styles.tabItem} ${idx === index && styles.active}`} key={idx} onClick={() => clickTab(idx)}>
						{tab.label}
					</li>
				))
			}
		</ul>
	)
}